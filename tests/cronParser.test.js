// day-05-crongenius/tests/cronParser.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { CronParser } from '../src/cronParser.js';

test('CronParser: Parses wildcard expression (* * * * *)', () => {
  const res = CronParser.parse('* * * * *');
  assert.equal(res.valid, true);
  assert.equal(res.values.minute.length, 60);
  assert.equal(res.values.hour.length, 24);
  assert.equal(res.values.dom.length, 31);
  assert.equal(res.values.month.length, 12);
  assert.equal(res.values.dow.length, 7);
});

test('CronParser: Parses step values (*/15 * * * *)', () => {
  const res = CronParser.parse('*/15 * * * *');
  assert.equal(res.valid, true);
  assert.deepEqual(res.values.minute, [0, 15, 30, 45]);
});

test('CronParser: Parses lists and ranges (0 9-17 * * 1-5)', () => {
  const res = CronParser.parse('0 9-17 * * 1-5');
  assert.equal(res.valid, true);
  assert.deepEqual(res.values.minute, [0]);
  assert.equal(res.values.hour.length, 9); // 9 through 17
  assert.deepEqual(res.values.dow, [1, 2, 3, 4, 5]); // Mon-Fri
});

test('CronParser: Rejects invalid field counts', () => {
  const res = CronParser.parse('* * *');
  assert.equal(res.valid, false);
  assert.match(res.error, /Expected 5 fields/);
});

test('CronParser: Rejects out of bounds values', () => {
  const res = CronParser.parse('65 * * * *');
  assert.equal(res.valid, false);
  assert.match(res.error, /out of range for Minute/);
});
