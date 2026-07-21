const ROLE_RULES = [
  {
    name: 'java developer fresher',
    positive: [/\bjava\b/i, /\bdeveloper\b/i, /\b(0[- ]?1|0[- ]?2|fresher|entry[- ]?level|graduate|junior|trainee)\b/i],
    negative: [/\b(senior|lead|manager|architect|qa|test|testing|automation)\b/i]
  },
  {
    name: 'front end developer fresher',
    positive: [/\b(front[- ]?end|frontend|ui|ux)\b/i, /\bdeveloper\b/i, /\b(0[- ]?1|0[- ]?2|fresher|entry[- ]?level|graduate|junior|trainee)\b/i],
    negative: [/\b(senior|lead|manager|architect)\b/i]
  },
  {
    name: 'java full stack developer fresher',
    positive: [/\bjava\b/i, /\b(full[- ]?stack|fullstack)\b/i, /\bdeveloper\b/i, /\b(0[- ]?1|0[- ]?2|fresher|entry[- ]?level|graduate|junior|trainee)\b/i],
    negative: [/\b(senior|lead|manager|architect)\b/i]
  },
  {
    name: 'sql developer fresher',
    positive: [/\bsql\b/i, /\bdeveloper\b/i, /\b(0[- ]?1|0[- ]?2|fresher|entry[- ]?level|graduate|junior|trainee)\b/i],
    negative: [/\b(senior|lead|manager|architect|data scientist|analytics)\b/i]
  }
];

export function normalizeText(value = '') {
  return String(value).toLowerCase().trim();
}

export function parseApplicants(value = '') {
  const text = normalizeText(value);
  const match = text.match(/(\d+)/);
  if (!match) {
    return null;
  }
  return Number(match[1]);
}

export function parsePostedAge(value = '') {
  const text = normalizeText(value);

  if (text.includes('just now') || text.includes('today') || text.includes('posted')) {
    return 0;
  }

  const dayMatch = text.match(/(\d+)\s+day/i);
  if (dayMatch) {
    return Number(dayMatch[1]) * 24;
  }

  const hourMatch = text.match(/(\d+)\s+hour/i) || text.match(/(\d+)\s+hr/i);
  if (hourMatch) {
    return Number(hourMatch[1]);
  }

  return Number.POSITIVE_INFINITY;
}

export function isPostedWithin24Hours(value = '', now = Date.now(), freshnessHours = 24) {
  const ageInHours = parsePostedAge(value);
  return Number.isFinite(ageInHours) && ageInHours <= freshnessHours;
}

export function matchesTargetRole(title = '', description = '') {
  const haystack = `${title} ${description}`.toLowerCase();

  return ROLE_RULES.some((rule) => {
    const hasPositive = rule.positive.every((pattern) => pattern.test(haystack));
    const hasNegative = rule.negative.some((pattern) => pattern.test(haystack));
    return hasPositive && !hasNegative;
  });
}

export function shouldApplyJob(job = {}, options = {}) {
  const title = job.title ?? '';
  const description = job.description ?? '';
  const postedText = job.postedText ?? '';
  const applicantsText = job.applicantsText ?? '';

  if (!matchesTargetRole(title, description)) {
    return false;
  }

  const applicants = parseApplicants(applicantsText);
  if (applicants === null || applicants >= (options.maxApplicants ?? 50)) {
    return false;
  }

  return isPostedWithin24Hours(postedText, options.now ?? Date.now(), options.freshnessHours ?? 24);
}
