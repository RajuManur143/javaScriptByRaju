import { existsSync } from 'node:fs';
import { chromium } from 'playwright';
import { shouldApplyJob } from './jobMatcher.mjs';

function getEdgeExecutablePath() {
  const candidates = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Users/Administrator/AppData/Local/Microsoft/Edge/Application/msedge.exe'
  ];

  return candidates.find((candidate) => existsSync(candidate));
}

function getEdgeUserDataDir() {
  const override = process.env.EDGE_USER_DATA_DIR;
  if (override && existsSync(override)) {
    return override;
  }

  const candidates = [
    'C:/Users/Administrator/AppData/Local/Microsoft/Edge/User Data',
    `${process.env.LOCALAPPDATA || ''}/Microsoft/Edge/User Data`
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate)) || null;
}

const SEARCH_QUERIES = [
  'frontend developer fresher',
  'java developer fresher',
  'java full stack developer fresher',
  'sql developer fresher'
];

const JOB_CARD_SELECTORS = [
  'a[href*="/job-listings/"]',
  'a[href*="/jobs/"]',
  'article',
  '[data-job-id]'
];

async function tryFill(page, selectors, value) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if ((await locator.count()) > 0) {
      await locator.fill(value);
      return true;
    }
  }
  return false;
}

async function tryClick(page, selectors) {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if ((await locator.count()) > 0) {
      await locator.click();
      return true;
    }
  }
  return false;
}

async function loginToNaukri(page) {
  await page.goto('https://www.naukri.com/mnjuser/homepage?utm_source=google&utm_medium=cpc&utm_campaign=Brand_Core_Exact', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(8000);
  await page.waitForLoadState('networkidle').catch(() => {});

  const pageText = await page.textContent('body');
  if (!pageText) {
    throw new Error('The Naukri homepage could not be opened. Please try again.');
  }

  console.log('Naukri homepage opened successfully.');
}

async function searchAndApply(page, query) {
  await page.goto('https://www.naukri.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const searchBox = page.locator('input[placeholder*="Search" i], input[name="keyword"], input[type="text"]').first();
  if (await searchBox.count()) {
    await searchBox.fill(query);
    await searchBox.press('Enter');
    await page.waitForTimeout(5000);
  } else {
    await page.goto(`https://www.naukri.com/${encodeURIComponent(query)}-jobs`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  }
  await page.waitForLoadState('networkidle').catch(() => {});

  const cards = page.locator(JOB_CARD_SELECTORS.join(', '));
  const count = await cards.count();

  for (let index = 0; index < Math.min(count, 120); index += 1) {
    const card = cards.nth(index);
    const text = await card.innerText().catch(() => '');
    const title = text.split('\n')[0] ?? '';

    const job = {
      title,
      description: text,
      postedText: text,
      applicantsText: text
    };

    const matches = shouldApplyJob(job);
    if (!matches) {
      continue;
    }

    console.log(`Matched role: ${title}`);

    const jobHref = await card.getAttribute('href').catch(() => '');
    if (!jobHref) {
      continue;
    }

    const newPage = await page.context().newPage();
    await newPage.goto(`https://www.naukri.com${jobHref}`, { waitUntil: 'domcontentloaded' });
    await newPage.waitForTimeout(2500);

    const applyClicked = await tryClick(newPage, [
      'button:has-text("Apply")',
      'a:has-text("Apply")',
      'button:has-text("Apply Now")',
      'a:has-text("Apply Now")',
      'button[type="button"]:has-text("Apply")',
      'button:has-text("Quick Apply")'
    ]);

    if (!applyClicked) {
      console.log(`No apply button found for: ${title}`);
    } else {
      console.log(`Attempted application for: ${title}`);
    }

    await newPage.close();
  }
}

export async function autoApplyToNaukri() {
  const edgeUserDataDir = getEdgeUserDataDir();
  let browser;
  let context;

  try {
    if (edgeUserDataDir) {
      browser = await chromium.launch({ headless: false, executablePath: getEdgeExecutablePath() || undefined });
      context = await browser.newContext({
        viewport: { width: 1440, height: 1200 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      });
    } else {
      browser = await chromium.launch({ headless: false, executablePath: getEdgeExecutablePath() || undefined });
      context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
    }
  } catch (error) {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
  }

  const page = await context.newPage();

  try {
    await loginToNaukri(page);
    for (const query of SEARCH_QUERIES) {
      await searchAndApply(page, query);
    }
  } catch (error) {
    console.error(error);
  } finally {
    await context.close();
    await browser.close();
  }
}

if (process.argv[1] && process.argv[1].endsWith('naukri-auto-apply.mjs')) {
  autoApplyToNaukri().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
