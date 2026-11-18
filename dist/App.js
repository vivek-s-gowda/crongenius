// day-05-crongenius/src/App.jsx
// Root Orchestrator for CronGenius React 19 Studio
import { CronParser } from './cronParser.js';
import { CronTranslator } from './cronTranslator.js';
import { CronCalculator } from './cronCalculator.js';
import { Header } from './components/Header.js';
import { CronExpressionBar } from './components/CronExpressionBar.js';
import { CronVisualBuilder } from './components/CronVisualBuilder.js';
import { ScheduleTimeline } from './components/ScheduleTimeline.js';
import { PresetsPicker } from './components/PresetsPicker.js';
import { WebhookSimulator } from './components/WebhookSimulator.js';
import { CodeSnippetExporter } from './components/CodeSnippetExporter.js';
import { Toast } from './components/Toast.js';
const { useState, useEffect, useMemo, useCallback } = window.React;
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
        if (!parseResult.valid)
            return [];
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
            }
            else if (hash === '#deepdive') {
                setActiveMainTab('simulator');
            }
            else if (hash === '#export') {
                setActiveMainTab('snippets');
            }
            else {
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
    return (React.createElement("div", { className: "app-root" },
        React.createElement(Header, { currentTheme: currentTheme, onThemeChange: (newTheme) => {
                setCurrentTheme(newTheme);
                showToast(`Theme: ${newTheme.toUpperCase()}`);
            }, timezone: timezone, onTimezoneChange: (newTz) => {
                setTimezone(newTz);
                showToast(`Timezone: ${newTz}`);
            }, onOpenSimulator: () => setActiveMainTab('simulator') }),
        React.createElement("main", { className: "main-content" },
            React.createElement(CronExpressionBar, { expression: expression, translation: humanTranslation, isValid: parseResult.valid, errorMsg: parseResult.error, onCopyExpression: (expr) => copyToClipboard(expr, 'Cron Expression'), onExpressionChange: handleRawExpressionChange }),
            React.createElement("nav", { className: "nav-tabs main-tabs" },
                React.createElement("button", { className: `tab-btn ${activeMainTab === 'builder' ? 'active' : ''}`, onClick: () => setActiveMainTab('builder') },
                    React.createElement("span", null, "\uD83D\uDEE0\uFE0F Visual Schedule Builder")),
                React.createElement("button", { className: `tab-btn ${activeMainTab === 'timeline' ? 'active' : ''}`, onClick: () => setActiveMainTab('timeline') },
                    React.createElement("span", null,
                        "\uD83D\uDCC5 Upcoming Runs (",
                        nextRuns.length,
                        ")")),
                React.createElement("button", { className: `tab-btn ${activeMainTab === 'simulator' ? 'active' : ''}`, onClick: () => setActiveMainTab('simulator') },
                    React.createElement("span", null, "\u26A1 Webhook Simulator")),
                React.createElement("button", { className: `tab-btn ${activeMainTab === 'snippets' ? 'active' : ''}`, onClick: () => setActiveMainTab('snippets') },
                    React.createElement("span", null, "\uD83D\uDCDC Code Snippets"))),
            activeMainTab === 'builder' && (React.createElement("div", { className: "tab-pane animated-fade-in" },
                React.createElement("div", { className: "two-column-layout" },
                    React.createElement(CronVisualBuilder, { fields: fields, onUpdateField: handleUpdateField, activeFieldTab: activeFieldTab, onSelectFieldTab: setActiveFieldTab }),
                    React.createElement(PresetsPicker, { currentExpression: expression, onSelectPreset: handleSelectPreset })))),
            activeMainTab === 'timeline' && (React.createElement("div", { className: "tab-pane animated-fade-in" },
                React.createElement(ScheduleTimeline, { nextRuns: nextRuns, timezone: timezone }))),
            activeMainTab === 'simulator' && (React.createElement("div", { className: "tab-pane animated-fade-in" },
                React.createElement(WebhookSimulator, { logs: logs, onTriggerTick: handleTriggerSimulatedTick, onClearLogs: () => setLogs([]), webhookUrl: webhookUrl, onUrlChange: setWebhookUrl }))),
            activeMainTab === 'snippets' && (React.createElement("div", { className: "tab-pane animated-fade-in" },
                React.createElement(CodeSnippetExporter, { expression: expression, onCopySnippet: copyToClipboard })))),
        React.createElement(Toast, { message: toastMsg })));
}
// Mount React 19 Application
const rootEl = document.getElementById('root');
if (rootEl) {
    const root = window.ReactDOM.createRoot(rootEl);
    root.render(window.React.createElement(App));
}
