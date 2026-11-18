// day-05-crongenius/src/cronCalculator.js
// Next execution runs calculator & schedule presets
import { CronParser } from './cronParser.js';
export const TIMEZONES = [
    { id: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { id: 'America/New_York', label: 'New York (EST/EDT, UTC-5/-4)' },
    { id: 'America/Los_Angeles', label: 'San Francisco (PST/PDT, UTC-8/-7)' },
    { id: 'Europe/London', label: 'London (GMT/BST, UTC+0/+1)' },
    { id: 'Asia/Kolkata', label: 'India Standard Time (IST, UTC+5:30)' },
    { id: 'Asia/Tokyo', label: 'Tokyo (JST, UTC+9)' }
];
export const SCHEDULE_PRESETS = [
    { name: 'Every 5 Minutes', expr: '*/5 * * * *', category: 'Frequent' },
    { name: 'Every 15 Minutes', expr: '*/15 * * * *', category: 'Frequent' },
    { name: 'Hourly on the Hour', expr: '0 * * * *', category: 'Hourly' },
    { name: 'Every 6 Hours', expr: '0 */6 * * *', category: 'Hourly' },
    { name: 'Daily at Midnight (00:00)', expr: '0 0 * * *', category: 'Daily' },
    { name: 'Daily at 02:00 AM', expr: '0 2 * * *', category: 'Daily' },
    { name: 'Weekdays at 09:00 AM', expr: '0 9 * * 1-5', category: 'Workdays' },
    { name: 'Sunday DB Backup at 03:00 AM', expr: '0 3 * * 0', category: 'Weekly' },
    { name: '1st of Month Billing at Midnight', expr: '0 0 1 * *', category: 'Monthly' }
];
export class CronCalculator {
    static getNextRuns(expression, count = 25, fromDate = new Date()) {
        const parsed = CronParser.parse(expression);
        if (!parsed.valid)
            return [];
        const runs = [];
        const current = new Date(fromDate.getTime());
        current.setSeconds(0, 0);
        // start at next minute
        current.setMinutes(current.getMinutes() + 1);
        const maxIterations = 200000;
        let iterations = 0;
        while (runs.length < count && iterations < maxIterations) {
            iterations++;
            const minute = current.getMinutes();
            const hour = current.getHours();
            const dom = current.getDate();
            const month = current.getMonth() + 1; // 1-12
            const dow = current.getDay(); // 0-6
            const matchMinute = parsed.values.minute.includes(minute);
            const matchHour = parsed.values.hour.includes(hour);
            const matchDom = parsed.values.dom.includes(dom);
            const matchMonth = parsed.values.month.includes(month);
            const matchDow = parsed.values.dow.includes(dow);
            if (matchMinute && matchHour && matchDom && matchMonth && matchDow) {
                runs.push(new Date(current.getTime()));
            }
            current.setMinutes(current.getMinutes() + 1);
        }
        return runs;
    }
    static getRelativeTime(targetDate, baseDate = new Date()) {
        const diffMs = targetDate.getTime() - baseDate.getTime();
        if (diffMs < 0)
            return 'in the past';
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHr / 24);
        if (diffMin < 1)
            return `in ${diffSec}s`;
        if (diffMin < 60)
            return `in ${diffMin}m`;
        if (diffHr < 24) {
            const remMin = diffMin % 60;
            return `in ${diffHr}h ${remMin > 0 ? `${remMin}m` : ''}`;
        }
        const remHr = diffHr % 24;
        return `in ${diffDays}d ${remHr > 0 ? `${remHr}h` : ''}`;
    }
    static formatInTimezone(date, timezone = 'UTC') {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }).format(date);
        }
        catch {
            return date.toISOString();
        }
    }
}
