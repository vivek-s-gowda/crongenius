// day-05-crongenius/src/App.jsx
// Root Orchestrator for CronGenius React 19 Studio

import { CronParser } from './cronParser.js';
import { CronTranslator } from './cronTranslator.js';
import { CronCalculator } from './cronCalculator.js';
import { Header } from './components/Header.jsx';
import { CronExpressionBar } from './components/CronExpressionBar.jsx';
import { CronVisualBuilder } from './components/CronVisualBuilder.jsx';
import { ScheduleTimeline } from './components/ScheduleTimeline.jsx';
import { PresetsPicker } from './components/PresetsPicker.jsx';
import { WebhookSimulator } from './components/WebhookSimulator.jsx';
import { CodeSnippetExporter } from './components/CodeSnippetExporter.jsx';
import { Toast } from './components/Toast.jsx';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
window.React = React;
window.ReactDOM = ReactDOM;

export function App() {
  const [currentTheme, setCurrentTheme] = useState('tokyo');
  const [timezone, setTimezone] = useState('UTC');
  const [expression, setExpression] = useState('*/15 * * * *');
  const [fields, setFields] = useState({
    minute: '*/15',
    hour: '*',
    dom: '*',
    month: '*',
    dow: '*'
  });
  const [activeFieldTab, setActiveFieldTab] = useState('minute');
  const [activeMainTab, setActiveMainTab] = useState('builder');
  const [webhookUrl, setWebhookUrl] = useState('https://api.cloudscale.io/v1/cron-webhook');
  const [logs, setLogs] = useState([
    { time: '10:45:00 UTC', status: '200 OK', message: 'Cron trigger dispatched successfully', latency: 42 },
    { time: '10:30:00 UTC', status: '200 OK', message: 'Job completed: backup-sync-archive', latency: 38 }
  ]);
  const [toastMsg, setToastMsg] = useState(null);

  // Sync theme attribute to HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  }, []);

  // Parse & validate expression
  const parseResult = useMemo(() => {
    return CronParser.parse(expression);
  }, [expression]);

  // Translate expression to human English
  const humanTranslation = useMemo(() => {
    return CronTranslator.translate(expression);
  }, [expression]);

  // Calculate upcoming runs
  const nextRuns = useMemo(() => {
    if (!parseResult.valid) return [];
    return CronCalculator.getNextRuns(expression, 25);
  }, [expression, parseResult]);

  // Update a single field and re-sync expression
  const handleUpdateField = useCallback((fieldKey, value) => {
    const updated = { ...fields, [fieldKey]: value };
    setFields(updated);
    const newExpr = `${updated.minute} ${updated.hour} ${updated.dom} ${updated.month} ${updated.dow}`;
    setExpression(newExpr);
  }, [fields]);

  // Update raw expression string directly
  const handleRawExpressionChange = useCallback((newExpr) => {
    setExpression(newExpr);
    const parts = newExpr.trim().split(/\s+/);
    if (parts.length === 5) {
      setFields({
        minute: parts[0],
        hour: parts[1],
        dom: parts[2],
        month: parts[3],
        dow: parts[4]
      });
    }
  }, []);

  // Handle Preset selection
  const handleSelectPreset = useCallback((presetExpr, presetName) => {
    handleRawExpressionChange(presetExpr);
    showToast(`Loaded preset: ${presetName}`);
  }, [handleRawExpressionChange, showToast]);

  // Trigger simulated cron tick
  const handleTriggerSimulatedTick = useCallback(() => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' ' + timezone;
    const latency = Math.floor(Math.random() * 45) + 25;
    const newLog = {
      time: nowStr,
      status: '200 OK',
      message: `Simulated tick fired: ${expression} -> ${webhookUrl}`,
      latency
    };
    setLogs(prev => [newLog, ...prev.slice(0, 19)]);
    showToast('⚡ Webhook tick triggered!');
  }, [expression, webhookUrl, timezone, showToast]);

  // Hash route listeners for snapshot automation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#workflow') {
        setActiveMainTab('builder');
        handleRawExpressionChange('0 9 * * 1-5'); // Weekday mornings at 9 AM
      } else if (hash === '#deepdive') {
        setActiveMainTab('simulator');
      } else if (hash === '#export') {
        setActiveMainTab('snippets');
      } else {
        setActiveMainTab('builder');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [handleRawExpressionChange]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  return (
    <div className="app-root">
      <Header
        currentTheme={currentTheme}
        onThemeChange={(newTheme) => {
          setCurrentTheme(newTheme);
          showToast(`Theme: ${newTheme.toUpperCase()}`);
        }}
        timezone={timezone}
        onTimezoneChange={(newTz) => {
          setTimezone(newTz);
          showToast(`Timezone: ${newTz}`);
        }}
        onOpenSimulator={() => setActiveMainTab('simulator')}
      />

      <main className="main-content">
        {/* Hero Expression Display & Live Translation */}
        <CronExpressionBar
          expression={expression}
          translation={humanTranslation}
          isValid={parseResult.valid}
          errorMsg={parseResult.error}
          onCopyExpression={(expr) => copyToClipboard(expr, 'Cron Expression')}
          onExpressionChange={handleRawExpressionChange}
        />

        {/* Main Tabs Navigation */}
        <nav className="nav-tabs main-tabs">
          <button
            className={`tab-btn ${activeMainTab === 'builder' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('builder')}
          >
            <span>🛠️ Visual Schedule Builder</span>
          </button>
          <button
            className={`tab-btn ${activeMainTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('timeline')}
          >
            <span>📅 Upcoming Runs ({nextRuns.length})</span>
          </button>
          <button
            className={`tab-btn ${activeMainTab === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('simulator')}
          >
            <span>⚡ Webhook Simulator</span>
          </button>
          <button
            className={`tab-btn ${activeMainTab === 'snippets' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('snippets')}
          >
            <span>📜 Code Snippets</span>
          </button>
        </nav>

        {/* Tab 1: Builder + Presets */}
        {activeMainTab === 'builder' && (
          <div className="tab-pane animated-fade-in">
            <div className="two-column-layout">
              <CronVisualBuilder
                fields={fields}
                onUpdateField={handleUpdateField}
                activeFieldTab={activeFieldTab}
                onSelectFieldTab={setActiveFieldTab}
              />
              <PresetsPicker
                currentExpression={expression}
                onSelectPreset={handleSelectPreset}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Timeline */}
        {activeMainTab === 'timeline' && (
          <div className="tab-pane animated-fade-in">
            <ScheduleTimeline
              nextRuns={nextRuns}
              timezone={timezone}
            />
          </div>
        )}

        {/* Tab 3: Webhook Simulator */}
        {activeMainTab === 'simulator' && (
          <div className="tab-pane animated-fade-in">
            <WebhookSimulator
              logs={logs}
              onTriggerTick={handleTriggerSimulatedTick}
              onClearLogs={() => setLogs([])}
              webhookUrl={webhookUrl}
              onUrlChange={setWebhookUrl}
            />
          </div>
        )}

        {/* Tab 4: Code Snippets */}
        {activeMainTab === 'snippets' && (
          <div className="tab-pane animated-fade-in">
            <CodeSnippetExporter
              expression={expression}
              onCopySnippet={copyToClipboard}
            />
          </div>
        )}
      </main>

      <Toast message={toastMsg} />
    </div>
  );
}

// Mount React 19 Application
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = window.ReactDOM.createRoot(rootEl);
  root.render(window.React.createElement(App));
}
