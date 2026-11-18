// day-05-crongenius/src/components/ScheduleTimeline.jsx
import { CronCalculator } from '../cronCalculator.js';
export function ScheduleTimeline({ nextRuns, timezone }) {
    const now = new Date();
    return (React.createElement("div", { className: "timeline-card card-elevated" },
        React.createElement("div", { className: "section-title" },
            React.createElement("span", null,
                "Upcoming Execution Schedule (Next ",
                nextRuns.length,
                " Runs)"),
            React.createElement("span", { className: "badge-pill animated-pulse" }, timezone)),
        nextRuns.length === 0 ? (React.createElement("div", { className: "empty-state-hint" }, "No upcoming runs found for this expression.")) : (React.createElement("div", { className: "runs-scroll-list" }, nextRuns.map((run, idx) => {
            const formatted = CronCalculator.formatInTimezone(run, timezone);
            const relative = CronCalculator.getRelativeTime(run, now);
            return (React.createElement("div", { key: idx, className: "run-item-row animated-slide-left" },
                React.createElement("span", { className: "run-index-badge" },
                    "#",
                    idx + 1),
                React.createElement("span", { className: "run-time-text" }, formatted),
                React.createElement("span", { className: "run-relative-chip" }, relative)));
        })))));
}
