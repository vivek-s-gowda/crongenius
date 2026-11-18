// day-05-crongenius/src/components/CronVisualBuilder.jsx
import { DOW_NAMES, MONTH_NAMES } from '../cronParser.js';
export function CronVisualBuilder({ fields, onUpdateField, activeFieldTab, onSelectFieldTab }) {
    const tabs = [
        { id: 'minute', label: 'Minute (0-59)' },
        { id: 'hour', label: 'Hour (0-23)' },
        { id: 'dom', label: 'Day of Month (1-31)' },
        { id: 'month', label: 'Month (1-12)' },
        { id: 'dow', label: 'Day of Week (Sun-Sat)' }
    ];
    return (React.createElement("div", { className: "builder-card card-elevated" },
        React.createElement("div", { className: "section-title" },
            React.createElement("span", null, "Interactive Visual Schedule Builder"),
            React.createElement("span", { className: "badge-pill" }, "Segmented Field Controls")),
        React.createElement("nav", { className: "nav-tabs subtabs" }, tabs.map(t => (React.createElement("button", { key: t.id, className: `tab-btn ${activeFieldTab === t.id ? 'active' : ''}`, onClick: () => onSelectFieldTab(t.id) }, t.label)))),
        React.createElement("div", { className: "builder-controls-body" },
            activeFieldTab === 'minute' && (React.createElement("div", { className: "field-control-grid animated-fade-in" },
                React.createElement("div", { className: "quick-pill-row" },
                    React.createElement("span", { className: "control-label" }, "Quick Patterns:"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('minute', '*') }, "Every Minute (*)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('minute', '*/5') }, "Every 5 mins (*/5)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('minute', '*/15') }, "Every 15 mins (*/15)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('minute', '0,30') }, "Every 30 mins (0,30)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('minute', '0') }, "On the Hour (:00)")),
                React.createElement("div", { className: "segmented-grid" }, [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(m => (React.createElement("button", { key: m, className: `grid-cell-btn ${fields.minute === String(m) || fields.minute.split(',').includes(String(m)) ? 'selected' : ''}`, onClick: () => onUpdateField('minute', String(m)) },
                    ":",
                    m < 10 ? `0${m}` : m)))))),
            activeFieldTab === 'hour' && (React.createElement("div", { className: "field-control-grid animated-fade-in" },
                React.createElement("div", { className: "quick-pill-row" },
                    React.createElement("span", { className: "control-label" }, "Quick Patterns:"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('hour', '*') }, "Every Hour (*)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('hour', '*/2') }, "Every 2 Hours (*/2)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('hour', '*/6') }, "Every 6 Hours (*/6)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('hour', '9-17') }, "Work Hours (9-17)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('hour', '0') }, "Midnight (00:00)")),
                React.createElement("div", { className: "segmented-grid hours-grid" }, Array.from({ length: 24 }).map((_, h) => (React.createElement("button", { key: h, className: `grid-cell-btn ${fields.hour === String(h) || fields.hour.split(',').includes(String(h)) ? 'selected' : ''}`, onClick: () => onUpdateField('hour', String(h)) }, h < 10 ? `0${h}:00` : `${h}:00`)))))),
            activeFieldTab === 'dom' && (React.createElement("div", { className: "field-control-grid animated-fade-in" },
                React.createElement("div", { className: "quick-pill-row" },
                    React.createElement("span", { className: "control-label" }, "Quick Patterns:"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dom', '*') }, "Every Day (*)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dom', '1') }, "1st of Month"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dom', '1,15') }, "1st & 15th"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dom', '1-10') }, "First 10 Days (1-10)")),
                React.createElement("div", { className: "segmented-grid dom-grid" }, Array.from({ length: 31 }).map((_, d) => {
                    const dayNum = d + 1;
                    return (React.createElement("button", { key: dayNum, className: `grid-cell-btn ${fields.dom === String(dayNum) ? 'selected' : ''}`, onClick: () => onUpdateField('dom', String(dayNum)) },
                        "Day ",
                        dayNum));
                })))),
            activeFieldTab === 'month' && (React.createElement("div", { className: "field-control-grid animated-fade-in" },
                React.createElement("div", { className: "quick-pill-row" },
                    React.createElement("span", { className: "control-label" }, "Quick Patterns:"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('month', '*') }, "Every Month (*)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('month', '*/3') }, "Quarterly (*/3)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('month', '1,7') }, "Semi-Annually (1,7)")),
                React.createElement("div", { className: "segmented-grid months-grid" }, MONTH_NAMES.map((mName, idx) => {
                    const mNum = idx + 1;
                    return (React.createElement("button", { key: mNum, className: `grid-cell-btn ${fields.month === String(mNum) ? 'selected' : ''}`, onClick: () => onUpdateField('month', String(mNum)) },
                        mName,
                        " (",
                        mNum,
                        ")"));
                })))),
            activeFieldTab === 'dow' && (React.createElement("div", { className: "field-control-grid animated-fade-in" },
                React.createElement("div", { className: "quick-pill-row" },
                    React.createElement("span", { className: "control-label" }, "Quick Patterns:"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dow', '*') }, "Every Day (*)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dow', '1-5') }, "Weekdays (Mon-Fri)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dow', '0,6') }, "Weekends (Sat-Sun)"),
                    React.createElement("button", { className: "pill-btn-outline", onClick: () => onUpdateField('dow', '0') }, "Sundays Only (0)")),
                React.createElement("div", { className: "segmented-grid dow-grid" }, DOW_NAMES.map((dName, idx) => (React.createElement("button", { key: idx, className: `grid-cell-btn ${fields.dow === String(idx) ? 'selected' : ''}`, onClick: () => onUpdateField('dow', String(idx)) }, dName)))))))));
}
