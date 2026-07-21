# Naukri auto-apply starter

This workspace contains a starter automation script for Naukri that:

- focuses on fresher-targeted Java, Frontend, and Java Full Stack roles
- filters jobs posted within 24 hours
- skips jobs with 50 or more applicants

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set your Naukri credentials:
   ```bash
   set NAUKRI_EMAIL=your-email@example.com
   set NAUKRI_PASSWORD=your-password
   ```
3. Run the script:
   ```bash
   npm start
   ```

## Notes

The Naukri UI changes often, so you may need to update the selectors in [naukri-auto-apply.mjs](naukri-auto-apply.mjs) if the login or apply buttons do not match your current page.
