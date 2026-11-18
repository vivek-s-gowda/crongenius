// day-05-crongenius/tests/cronCalculator.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { CronCalculator } from '../src/cronCalculator.js';

test('CronCalculator: Calculates next 5 runs accurately', () => {
  const base = new Date('2026-01-01T10:00:00Z');
  const runs = CronCalculator.getNextRuns('*/15 * * * *', 5, base);
  assert.equal(runs.length, 5);
  // Runs should be spaced by 15 mins
  assert.equal(runs[0].getMinutes(), 15);
  assert.equal(runs[1].getMinutes(), 30);
  assert.equal(runs[2].getMinutes(), 45);
  assert.equal(runs[3].getMinutes(), 0);
  assert.equal(runs[4].getMinutes(), 15);
});

test('CronCalculator: Formats relative time strings', () => {
  const now = new Date();
  const in5Min = new Date(now.getTime() + 5 * 60 * 1000);
  const in3Hours = new Date(now.getTime() + 3 * 3600 * 1000);
  assert.match(CronCalculator.getRelativeTime(in5Min, now), /^in 5m/);
  assert.match(CronCalculator.getRelativeTime(in3Hours, now), /^in 3h/);
});

test('CronCalculator: Formats dates with specific timezone', () => {
  const date = new Date('2026-06-15T12:00:00Z');
  const formattedUTC = CronCalculator.formatInTimezone(date, 'UTC');
  assert.match(formattedUTC, /12:00:00/);
});
