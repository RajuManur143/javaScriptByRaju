import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldApplyJob } from '../jobMatcher.mjs';

test('accepts a fresher Java developer role within 24 hours and under 50 applicants', () => {
  const job = {
    title: 'Java Developer Fresher',
    description: 'Entry-level Java developer role for freshers',
    postedText: '2 hours ago',
    applicantsText: '12 applicants'
  };

  assert.equal(shouldApplyJob(job), true);
});

test('rejects jobs older than 24 hours', () => {
  const job = {
    title: 'Java Developer Fresher',
    description: 'Entry-level Java developer role for freshers',
    postedText: '2 days ago',
    applicantsText: '12 applicants'
  };

  assert.equal(shouldApplyJob(job), false);
});

test('rejects jobs with more than 50 applicants', () => {
  const job = {
    title: 'Java Developer Fresher',
    description: 'Entry-level Java developer role for freshers',
    postedText: '3 hours ago',
    applicantsText: '65 applicants'
  };

  assert.equal(shouldApplyJob(job), false);
});
