// day-05-crongenius/src/cronTranslator.js
// Human-readable English translator for cron expressions
import { DOW_NAMES, MONTH_NAMES } from './cronParser.js';
export class CronTranslator {
    static formatTime(hour, minute) {
        const h = parseInt(hour, 10);
        const m = parseInt(minute, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 === 0 ? 12 : h % 12;
        const displayM = m < 10 ? `0${m}` : m;
        const padH = h < 10 ? `0${h}` : h;
        return `${displayH}:${displayM} ${ampm} (${padH}:${displayM})`;
    }
    static translate(expression) {
        if (!expression || typeof expression !== 'string')
            return 'Invalid schedule';
        const parts = expression.trim().split(/\s+/);
        if (parts.length !== 5)
            return 'Invalid 5-field cron format';
        const [minute, hour, dom, month, dow] = parts;
        // 1. Every minute
        if (minute === '*' && hour === '*' && dom === '*' && month === '*' && dow === '*') {
            return 'Every single minute, 24/7';
        }
        // 2. Every N minutes
        if (minute.startsWith('*/') && hour === '*' && dom === '*' && month === '*' && dow === '*') {
            const step = minute.split('/')[1];
            return `Every ${step} minutes`;
        }
        // 3. Hourly at specific minute
        if (!minute.includes('*') && !minute.includes('/') && hour === '*' && dom === '*' && month === '*' && dow === '*') {
            return `At minute ${minute} of every hour`;
        }
        // 4. Every N hours
        if (minute === '0' && hour.startsWith('*/') && dom === '*' && month === '*' && dow === '*') {
            const step = hour.split('/')[1];
            return `Every ${step} hours on the hour`;
        }
        // 5. Daily at specific time
        if (!minute.includes('*') && !hour.includes('*') && !hour.includes('/') && dom === '*' && month === '*' && dow === '*') {
            return `Every day at ${this.formatTime(hour, minute)}`;
        }
        // 6. Weekdays
        if (!minute.includes('*') && !hour.includes('*') && dom === '*' && month === '*' && dow === '1-5') {
            return `Every weekday (Monday through Friday) at ${this.formatTime(hour, minute)}`;
        }
        // 7. Weekends
        if (!minute.includes('*') && !hour.includes('*') && dom === '*' && month === '*' && (dow === '0,6' || dow === '6,0')) {
            return `Every weekend (Saturday & Sunday) at ${this.formatTime(hour, minute)}`;
        }
        // 8. Specific Day of Week
        if (!minute.includes('*') && !hour.includes('*') && dom === '*' && month === '*' && /^[0-6]$/.test(dow)) {
            const dayName = DOW_NAMES[parseInt(dow, 10)];
            return `Every ${dayName} at ${this.formatTime(hour, minute)}`;
        }
        // 9. Day of Month
        if (!minute.includes('*') && !hour.includes('*') && dom !== '*' && month === '*' && dow === '*') {
            return `On day ${dom} of every month at ${this.formatTime(hour, minute)}`;
        }
        // General fallback composite explanation
        const timeDesc = (minute === '*' && hour === '*')
            ? 'every minute'
            : (hour === '*' ? `at minute ${minute}` : `at ${this.formatTime(hour, minute)}`);
        const domDesc = dom === '*' ? '' : ` on day ${dom} of the month`;
        const monthDesc = month === '*' ? '' : ` in ${this.describeMonth(month)}`;
        const dowDesc = dow === '*' ? '' : ` on ${this.describeDOW(dow)}`;
        return `Runs ${timeDesc}${domDesc}${dowDesc}${monthDesc}`;
    }
    static describeDOW(dowStr) {
        if (dowStr === '1-5')
            return 'weekdays (Mon-Fri)';
        if (dowStr === '0,6' || dowStr === '6,0')
            return 'weekends (Sat, Sun)';
        if (dowStr.includes(',')) {
            return dowStr.split(',').map(d => DOW_NAMES[parseInt(d, 10)]).join(', ');
        }
        const idx = parseInt(dowStr, 10);
        return isNaN(idx) ? dowStr : DOW_NAMES[idx] || dowStr;
    }
    static describeMonth(monthStr) {
        if (monthStr.includes(',')) {
            return monthStr.split(',').map(m => MONTH_NAMES[parseInt(m, 10) - 1]).join(', ');
        }
        const idx = parseInt(monthStr, 10);
        return isNaN(idx) ? monthStr : MONTH_NAMES[idx - 1] || monthStr;
    }
}
