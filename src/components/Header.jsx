// day-05-crongenius/src/components/Header.jsx
import { THEMES } from '../themes.js';
import { TIMEZONES } from '../cronCalculator.js';

export function Header({
  currentTheme,
  onThemeChange,
  timezone,
  onTimezoneChange,
  onOpenSimulator
}) {
  return (
    <header className="app-header glass-panel">
      <div className="brand-section">
        <div className="logo-badge animated-pulse">⏱️</div>
        <div className="brand-text">
          <h1 className="gradient-text">CronGenius</h1>
          <div className="brand-subtitle">Visual Cron Engine & Schedule Studio</div>
        </div>
      </div>

      <div className="header-controls">
        {/* Dynamic Theme Switcher */}
        <div className="control-group glass-chip">
          <span className="control-label">Theme:</span>
          <div className="pill-group">
            {THEMES.map(t => (
              <button
                key={t.id}
                className={`pill-btn theme-pill ${currentTheme === t.id ? 'active' : ''}`}
                onClick={() => onThemeChange(t.id)}
                title={t.name}
              >
                <span className="theme-dot" style={{ background: t.primary }}></span>
                {t.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Timezone Selector */}
        <div className="control-group glass-chip">
          <span className="control-label">Timezone:</span>
          <select
            className="select-input"
            value={timezone}
            onChange={(e) => onTimezoneChange(e.target.value)}
          >
            {TIMEZONES.map(tz => (
              <option key={tz.id} value={tz.id}>{tz.label}</option>
            ))}
          </select>
        </div>

        <button className="btn-glow" onClick={onOpenSimulator}>
          <span>🚀 Webhook Simulator</span>
        </button>
      </div>
    </header>
  );
}
