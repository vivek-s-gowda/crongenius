// day-05-crongenius/src/cronParser.js
// Standard 5-field Cron parser and syntax validator
export const CRON_FIELDS = [
    { id: 'minute', name: 'Minute', min: 0, max: 59, defaultValue: '*' },
    { id: 'hour', name: 'Hour', min: 0, max: 23, defaultValue: '*' },
    { id: 'dom', name: 'Day of Month', min: 1, max: 31, defaultValue: '*' },
    { id: 'month', name: 'Month', min: 1, max: 12, defaultValue: '*' },
    { id: 'dow', name: 'Day of Week', min: 0, max: 6, defaultValue: '*' }
];
export const MONTH_NAMES = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
export const DOW_NAMES = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
export class CronParser {
    static parse(expression) {
        if (!expression || typeof expression !== 'string') {
            return { valid: false, error: 'Expression must be a non-empty string' };
        }
        const parts = expression.trim().split(/\s+/);
        if (parts.length !== 5) {
            return {
                valid: false,
                error: `Expected 5 fields (minute hour dom month dow), received ${parts.length}`
            };
        }
        const [minute, hour, dom, month, dow] = parts;
        const errors = [];
        const parsed = {
            minute: this.validateField(minute, 0, 59, 'Minute'),
            hour: this.validateField(hour, 0, 23, 'Hour'),
            dom: this.validateField(dom, 1, 31, 'Day of Month'),
            month: this.validateField(month, 1, 12, 'Month'),
            dow: this.validateField(dow, 0, 6, 'Day of Week')
        };
        for (const [key, res] of Object.entries(parsed)) {
            if (!res.valid) {
                errors.push(res.error);
            }
        }
        if (errors.length > 0) {
            return { valid: false, error: errors.join('; '), parts };
        }
        return {
            valid: true,
            expression: `${minute} ${hour} ${dom} ${month} ${dow}`,
            fields: { minute, hour, dom, month, dow },
            values: {
                minute: parsed.minute.values,
                hour: parsed.hour.values,
                dom: parsed.dom.values,
                month: parsed.month.values,
                dow: parsed.dow.values
            }
        };
    }
    static validateField(fieldStr, min, max, fieldName) {
        if (fieldStr === '*') {
            const all = [];
            for (let i = min; i <= max; i++)
                all.push(i);
            return { valid: true, values: all };
        }
        // Step values: */5 or 10-30/2
        if (fieldStr.includes('/')) {
            const [rangePart, stepStr] = fieldStr.split('/');
            const step = parseInt(stepStr, 10);
            if (isNaN(step) || step <= 0) {
                return { valid: false, error: `Invalid step value in ${fieldName}: /${stepStr}` };
            }
            let start = min;
            let end = max;
            if (rangePart !== '*') {
                if (rangePart.includes('-')) {
                    const [s, e] = rangePart.split('-').map(Number);
                    start = s;
                    end = e;
                }
                else {
                    start = parseInt(rangePart, 10);
                }
            }
            if (start < min || end > max || start > end) {
                return { valid: false, error: `Invalid range in ${fieldName}: ${rangePart}` };
            }
            const vals = [];
            for (let i = start; i <= end; i += step) {
                vals.push(i);
            }
            return { valid: true, values: vals };
        }
        // List: 1,3,5
        if (fieldStr.includes(',')) {
            const items = fieldStr.split(',');
            const vals = new Set();
            for (const item of items) {
                const sub = this.validateField(item, min, max, fieldName);
                if (!sub.valid)
                    return sub;
                sub.values.forEach(v => vals.add(v));
            }
            return { valid: true, values: Array.from(vals).sort((a, b) => a - b) };
        }
        // Range: 1-5
        if (fieldStr.includes('-')) {
            const [startStr, endStr] = fieldStr.split('-');
            const start = parseInt(startStr, 10);
            const end = parseInt(endStr, 10);
            if (isNaN(start) || isNaN(end) || start < min || end > max || start > end) {
                return { valid: false, error: `Invalid range in ${fieldName}: ${fieldStr}` };
            }
            const vals = [];
            for (let i = start; i <= end; i++)
                vals.push(i);
            return { valid: true, values: vals };
        }
        // Single number
        const num = parseInt(fieldStr, 10);
        if (isNaN(num) || num < min || num > max) {
            return { valid: false, error: `Value out of range for ${fieldName}: ${fieldStr} (allowed: ${min}-${max})` };
        }
        return { valid: true, values: [num] };
    }
}
