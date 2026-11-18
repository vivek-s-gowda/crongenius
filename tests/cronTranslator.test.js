// day-05-crongenius/tests/cronTranslator.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { CronTranslator } from '../src/cronTranslator.js';

test('CronTranslator: Translates every minute', () => {
  assert.equal(CronTranslator.translate('* * * * *'), 'Every single minute, 24/7');
});

test('CronTranslator: Translates steps (*/5 * * * *)', () => {
  assert.equal(CronTranslator.translate('*/5 * * * *'), 'Every 5 minutes');
});

test('CronTranslator: Translates daily at specific time (0 2 * * *)', () => {
  assert.equal(CronTranslator.translate('0 2 * * *'), 'Every day at 2:00 AM (02:00)');
});

test('CronTranslator: Translates weekdays (0 9 * * 1-5)', () => {
  assert.equal(CronTranslator.translate('0 9 * * 1-5'), 'Every weekday (Monday through Friday) at 9:00 AM (09:00)');
});

test('CronTranslator: Translates weekends (0 12 * * 0,6)', () => {
  assert.equal(CronTranslator.translate('0 12 * * 0,6'), 'Every weekend (Saturday & Sunday) at 12:00 PM (12:00)');
});

test('CronTranslator: Translates specific day of week (0 3 * * 0)', () => {
  assert.equal(CronTranslator.translate('0 3 * * 0'), 'Every Sunday at 3:00 AM (03:00)');
});
