// day-05-crongenius/src/components/PresetsPicker.jsx
import { SCHEDULE_PRESETS } from '../cronCalculator.js';

export function PresetsPicker({ currentExpression, onSelectPreset }) {
  return (
    <div className="presets-card card-elevated">
      <div className="section-title">
        <span>Production Schedule Presets</span>
        <span className="badge-pill">1-Click Templates</span>
      </div>

      <div className="presets-grid">
        {SCHEDULE_PRESETS.map((p, idx) => {
          const isSelected = currentExpression === p.expr;
          return (
            <button
              key={idx}
              className={`preset-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectPreset(p.expr, p.name)}
            >
              <div className="preset-top">
                <span className="preset-name">{p.name}</span>
                <span className="preset-cat">{p.category}</span>
              </div>
              <code className="preset-expr">{p.expr}</code>
            </button>
          );
        })}
      </div>
    </div>
  );
}
