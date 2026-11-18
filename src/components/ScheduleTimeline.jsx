// day-05-crongenius/src/components/ScheduleTimeline.jsx
import { CronCalculator } from '../cronCalculator.js';

export function ScheduleTimeline({ nextRuns, timezone }) {
  const now = new Date();

  return (
    <div className="timeline-card card-elevated">
      <div className="section-title">
        <span>Upcoming Execution Schedule (Next {nextRuns.length} Runs)</span>
        <span className="badge-pill animated-pulse">{timezone}</span>
      </div>

      {nextRuns.length === 0 ? (
        <div className="empty-state-hint">No upcoming runs found for this expression.</div>
      ) : (
        <div className="runs-scroll-list">
          {nextRuns.map((run, idx) => {
            const formatted = CronCalculator.formatInTimezone(run, timezone);
            const relative = CronCalculator.getRelativeTime(run, now);
            return (
              <div key={idx} className="run-item-row animated-slide-left">
                <span className="run-index-badge">#{idx + 1}</span>
                <span className="run-time-text">{formatted}</span>
                <span className="run-relative-chip">{relative}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
