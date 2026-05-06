/**
 * System ustawień edytora: localStorage prefs + panel boczny (sidebar).
 * Markup panelu: settings-panel.html — wstrzykiwany dynamicznie (fetch / XHR).
 * Zależności od index.js: window.editor, window.setBracketGuidesEnabled, window.updateFooterStatus, window.bracketGuidesEnabled (sync).
 */
(function (global) {
    'use strict';

    const EDITOR_PREFS_KEY = 'vseditor_editor_prefs';

    function resolveSettingsPanelUrl() {
        try {
            const cur = document.currentScript && document.currentScript.src;
            if (cur) {
                return new URL('settings-panel.html', cur).href;
            }
        } catch (e) {
            /* ignore */
        }
        return 'settings-panel.html';
    }

    function extractSettingsPanelFragment(html) {
        const raw = String(html).trim();
        if (!raw) return '';
        if (/^<!DOCTYPE/i.test(raw) || /^<html[\s>]/i.test(raw)) {
            try {
                const doc = new DOMParser().parseFromString(raw, 'text/html');
                if (doc.body) return doc.body.innerHTML.trim();
            } catch (e) {
                /* ignore */
            }
        }
        return raw;
    }

    function insertSettingsPanelMarkup(html) {
        if (document.getElementById('settings-sidebar')) return;
        if (!document.body || !html || !String(html).trim()) return;
        const fragment = extractSettingsPanelFragment(html);
        if (!fragment) return;
        document.body.insertAdjacentHTML('afterbegin', fragment);
    }

    function loadSettingsPanelHtmlSync(url) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            if (xhr.status === 200 || xhr.status === 0) return xhr.responseText;
        } catch (e) {
            /* ignore */
        }
        return null;
    }

    function mountSettingsPanel() {
        if (document.getElementById('settings-sidebar')) {
            return Promise.resolve();
        }
        if (!document.body) {
            return Promise.reject(new Error('Brak document.body'));
        }
        const url = resolveSettingsPanelUrl();
        return fetch(url, { cache: 'no-store' })
            .then((res) => {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then((html) => {
                insertSettingsPanelMarkup(html);
            })
            .catch(() => {
                const fallback = loadSettingsPanelHtmlSync(url);
                if (fallback) {
                    insertSettingsPanelMarkup(fallback);
                    return;
                }
                console.warn(
                    '[vseditor] Nie wczytano settings-panel.html z',
                    url,
                    '— uruchom przez lokalny serwer HTTP (np. Live Server) lub upewnij się, że plik leży obok set.js.'
                );
            });
    }

    function getDefaultEditorPrefs() {
        return {
            wordWrap: true,
            minimap: true,
            lineNumbers: true,
            indentGuides: true,
            fontSize: 14,
            lineHeight: 21,
            tabSize: 4,
            insertSpaces: true,
            formatOnType: true,
            formatOnPaste: true,
            fontLigatures: true,
            smoothScrolling: true,
            mouseWheelZoom: true,
            scrollBeyondLastLine: false,
            renderWhitespace: false,
            bracketPairColorization: true,
            linkedEditing: true,
            suggestOn: true,
            hoverEnabled: true,
            folding: true,
            glyphMargin: true,
            occurrencesHighlight: true,
            selectionHighlight: true,
            colorDecorators: true,
            cursorStyle: 'line',
            cursorBlinking: 'blink'
        };
    }

    function getEditorPrefs() {
        try {
            const raw = localStorage.getItem(EDITOR_PREFS_KEY);
            if (!raw) return getDefaultEditorPrefs();
            return { ...getDefaultEditorPrefs(), ...JSON.parse(raw) };
        } catch (e) {
            return getDefaultEditorPrefs();
        }
    }

    function saveEditorPrefs(partial) {
        try {
            const next = { ...getEditorPrefs(), ...partial };
            localStorage.setItem(EDITOR_PREFS_KEY, JSON.stringify(next));
        } catch (e) {
            console.warn('saveEditorPrefs failed', e);
        }
    }

    function getEditorInstance() {
        return global.editor || null;
    }

    function guidesCheckedState() {
        if (typeof global.bracketGuidesEnabled === 'boolean') {
            return global.bracketGuidesEnabled;
        }
        return true;
    }

    function openSettingsPanel() {
        const overlay = document.getElementById('settings-sidebar-overlay');
        const panel = document.getElementById('settings-sidebar');
        if (!overlay || !panel) return;
        panel.querySelectorAll('.settings-tab').forEach((b, i) => {
            const on = i === 0;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        panel.querySelectorAll('.settings-tab-content').forEach((p) => {
            p.classList.toggle('active', p.id === 'settings-tab-editor');
        });
        syncSettingsPanelFromPrefs();
        overlay.classList.add('active');
        panel.classList.add('active');
        document.body.classList.add('settings-sidebar-open');
    }

    function closeSettingsPanel() {
        const overlay = document.getElementById('settings-sidebar-overlay');
        const panel = document.getElementById('settings-sidebar');
        if (overlay) overlay.classList.remove('active');
        if (panel) panel.classList.remove('active');
        document.body.classList.remove('settings-sidebar-open');
    }

    function syncSettingsPanelFromPrefs() {
        const p = getEditorPrefs();
        const ed = getEditorInstance();
        const ro = ed && typeof ed.getRawOptions === 'function' ? ed.getRawOptions() : null;

        function setChk(id, val) {
            const el = document.getElementById(id);
            if (el) el.checked = !!val;
        }

        if (ro) {
            setChk('setting-word-wrap', ro.wordWrap === 'on');
            setChk('setting-minimap', !!(ro.minimap && ro.minimap.enabled));
            setChk('setting-line-numbers', ro.lineNumbers !== 'off' && ro.lineNumbers !== false);
            setChk('setting-insert-spaces', ro.insertSpaces !== false);
            setChk('setting-format-on-type', ro.formatOnType !== false);
            setChk('setting-format-on-paste', ro.formatOnPaste !== false);
            setChk(
                'setting-font-ligatures',
                ro.fontLigatures === true || ro.fontLigatures === 'on' || ro.fontLigatures === 'any'
            );
            setChk('setting-smooth-scroll', ro.smoothScrolling === true);
            setChk('setting-mouse-wheel-zoom', ro.mouseWheelZoom === true);
            setChk('setting-scroll-beyond', ro.scrollBeyondLastLine === true);
            setChk('setting-render-whitespace', !!(ro.renderWhitespace && ro.renderWhitespace !== 'none'));
            setChk(
                'setting-bracket-colors',
                !!(ro.bracketPairColorization && ro.bracketPairColorization.enabled !== false)
            );
            setChk('setting-linked-editing', ro.linkedEditing === true);
            setChk(
                'setting-inline-suggest',
                !!(ro.inlineSuggest && ro.inlineSuggest.enabled !== false) &&
                (ro.suggest == null || ro.suggest.enabled !== false)
            );
            setChk('setting-hover', !!(ro.hover && ro.hover.enabled !== false));
            setChk('setting-folding', ro.folding !== false);
            setChk('setting-glyph-margin', ro.glyphMargin === true);
            setChk('setting-occurrences-highlight', ro.occurrencesHighlight !== false);
            setChk('setting-selection-highlight', ro.selectionHighlight !== false);
            setChk('setting-color-decorators', ro.colorDecorators !== false);
        } else {
            setChk('setting-word-wrap', p.wordWrap !== false);
            setChk('setting-minimap', p.minimap !== false);
            setChk('setting-line-numbers', p.lineNumbers !== false);
            setChk('setting-insert-spaces', p.insertSpaces !== false);
            setChk('setting-format-on-type', p.formatOnType !== false);
            setChk('setting-format-on-paste', p.formatOnPaste !== false);
            setChk('setting-font-ligatures', p.fontLigatures !== false);
            setChk('setting-smooth-scroll', p.smoothScrolling !== false);
            setChk('setting-mouse-wheel-zoom', p.mouseWheelZoom !== false);
            setChk('setting-scroll-beyond', p.scrollBeyondLastLine === true);
            setChk('setting-render-whitespace', p.renderWhitespace === true);
            setChk('setting-bracket-colors', p.bracketPairColorization !== false);
            setChk('setting-linked-editing', p.linkedEditing !== false);
            setChk('setting-inline-suggest', p.suggestOn !== false);
            setChk('setting-hover', p.hoverEnabled !== false);
            setChk('setting-folding', p.folding !== false);
            setChk('setting-glyph-margin', p.glyphMargin !== false);
            setChk('setting-occurrences-highlight', p.occurrencesHighlight !== false);
            setChk('setting-selection-highlight', p.selectionHighlight !== false);
            setChk('setting-color-decorators', p.colorDecorators !== false);
        }

        const g = document.getElementById('setting-indent-guides');
        if (g) g.checked = guidesCheckedState();

        const fs = document.getElementById('setting-font-size');
        const fsv = document.getElementById('setting-font-size-value');
        const lh = document.getElementById('setting-line-height');
        const lhv = document.getElementById('setting-line-height-value');
        const ts = document.getElementById('setting-tab-size');
        const cs = document.getElementById('setting-cursor-style');
        const cb = document.getElementById('setting-cursor-blink');

        const fontSize = ro && ro.fontSize != null ? ro.fontSize : p.fontSize || 14;
        if (fs) fs.value = String(fontSize);
        if (fsv) fsv.textContent = String(fontSize);

        const lineHeight = ro && ro.lineHeight != null ? ro.lineHeight : p.lineHeight || 21;
        if (lh) lh.value = String(lineHeight);
        if (lhv) lhv.textContent = String(lineHeight);

        if (ts) ts.value = String((ro && ro.tabSize != null ? ro.tabSize : null) ?? p.tabSize ?? 4);
        if (cs) cs.value = (ro && ro.cursorStyle) || p.cursorStyle || 'line';
        if (cb) cb.value = (ro && ro.cursorBlinking) || p.cursorBlinking || 'blink';
    }

    function applyEditorPrefsFromPanel() {
        const ed = getEditorInstance();
        if (!ed) return;
        const chk = (id) => !!(document.getElementById(id) && document.getElementById(id).checked);

        const wordWrap = chk('setting-word-wrap');
        const minimap = chk('setting-minimap');
        const lineNumbers = chk('setting-line-numbers');
        const indentGuides = chk('setting-indent-guides');
        const insertSpaces = chk('setting-insert-spaces');
        const formatOnType = chk('setting-format-on-type');
        const formatOnPaste = chk('setting-format-on-paste');
        const fontLigatures = chk('setting-font-ligatures');
        const smoothScrolling = chk('setting-smooth-scroll');
        const mouseWheelZoom = chk('setting-mouse-wheel-zoom');
        const scrollBeyondLastLine = chk('setting-scroll-beyond');
        const renderWhitespace = chk('setting-render-whitespace');
        const bracketPairColorization = chk('setting-bracket-colors');
        const linkedEditing = chk('setting-linked-editing');
        const suggestOn = chk('setting-inline-suggest');
        const hoverEnabled = chk('setting-hover');
        const folding = chk('setting-folding');
        const glyphMargin = chk('setting-glyph-margin');
        const occurrencesHighlight = chk('setting-occurrences-highlight');
        const selectionHighlight = chk('setting-selection-highlight');
        const colorDecorators = chk('setting-color-decorators');

        const fs = document.getElementById('setting-font-size');
        const lh = document.getElementById('setting-line-height');
        const ts = document.getElementById('setting-tab-size');
        const cs = document.getElementById('setting-cursor-style');
        const cb = document.getElementById('setting-cursor-blink');

        const fontSize = fs ? Math.max(10, Math.min(22, parseInt(fs.value, 10) || 14)) : 14;
        const lineHeight = lh ? Math.max(16, Math.min(32, parseInt(lh.value, 10) || 21)) : 21;
        const tabSize = ts ? Math.max(2, Math.min(8, parseInt(ts.value, 10) || 4)) : 4;
        const cursorStyle = (cs && cs.value) || 'line';
        const cursorBlinking = (cb && cb.value) || 'blink';

        ed.updateOptions({
            wordWrap: wordWrap ? 'on' : 'off',
            minimap: { enabled: minimap },
            lineNumbers: lineNumbers ? 'on' : 'off',
            fontSize,
            lineHeight,
            tabSize,
            insertSpaces,
            formatOnType,
            formatOnPaste,
            fontLigatures,
            smoothScrolling,
            mouseWheelZoom,
            scrollBeyondLastLine,
            renderWhitespace: renderWhitespace ? 'all' : 'none',
            bracketPairColorization: {
                enabled: bracketPairColorization,
                independentColorPoolPerBracketType: true
            },
            linkedEditing,
            inlineSuggest: { enabled: suggestOn, mode: 'prefix' },
            hover: { enabled: hoverEnabled, delay: 300 },
            suggest: {
                enabled: suggestOn,
                showSnippets: true,
                showKeywords: true,
                showColors: true,
                showConstants: true,
                showClasses: true,
                showFields: true,
                showFunctions: true,
                showMethods: true,
                showProperties: true,
                showVariables: true,
                showWords: true
            },
            quickSuggestions: {
                other: suggestOn,
                comments: suggestOn,
                strings: suggestOn
            },
            folding,
            glyphMargin,
            occurrencesHighlight,
            selectionHighlight,
            colorDecorators,
            cursorStyle,
            cursorBlinking
        });

        if (typeof global.setBracketGuidesEnabled === 'function') {
            global.setBracketGuidesEnabled(indentGuides, false);
        }

        saveEditorPrefs({
            wordWrap,
            minimap,
            lineNumbers,
            indentGuides,
            fontSize,
            lineHeight,
            tabSize,
            insertSpaces,
            formatOnType,
            formatOnPaste,
            fontLigatures,
            smoothScrolling,
            mouseWheelZoom,
            scrollBeyondLastLine,
            renderWhitespace,
            bracketPairColorization,
            linkedEditing,
            suggestOn,
            hoverEnabled,
            folding,
            glyphMargin,
            occurrencesHighlight,
            selectionHighlight,
            colorDecorators,
            cursorStyle,
            cursorBlinking
        });

        if (typeof global.updateFooterStatus === 'function') {
            global.updateFooterStatus('Ustawienia zapisane', 'save');
            setTimeout(() => global.updateFooterStatus('Ready', 'circle'), 1500);
        }
    }

    function initSettingsPanelTabs() {
        const panel = document.getElementById('settings-sidebar');
        if (!panel) return;
        panel.querySelectorAll('.settings-tab').forEach((btn) => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-settings-tab');
                if (!tab) return;
                panel.querySelectorAll('.settings-tab').forEach((b) => {
                    const on = b === btn;
                    b.classList.toggle('active', on);
                    b.setAttribute('aria-selected', on ? 'true' : 'false');
                });
                panel.querySelectorAll('.settings-tab-content').forEach((p) => {
                    p.classList.toggle('active', p.id === `settings-tab-${tab}`);
                });
            });
        });
    }

    function initSettingsPanelBind() {
        initSettingsPanelTabs();
        const fs = document.getElementById('setting-font-size');
        const fsv = document.getElementById('setting-font-size-value');
        if (fs && fsv) {
            fs.addEventListener('input', () => {
                fsv.textContent = fs.value;
            });
            fs.addEventListener('change', () => applyEditorPrefsFromPanel());
        }
        const lh = document.getElementById('setting-line-height');
        const lhv = document.getElementById('setting-line-height-value');
        if (lh && lhv) {
            lh.addEventListener('input', () => {
                lhv.textContent = lh.value;
            });
            lh.addEventListener('change', () => applyEditorPrefsFromPanel());
        }
        const editorToggleIds = [
            'setting-word-wrap',
            'setting-minimap',
            'setting-line-numbers',
            'setting-indent-guides',
            'setting-insert-spaces',
            'setting-format-on-type',
            'setting-format-on-paste',
            'setting-font-ligatures',
            'setting-smooth-scroll',
            'setting-mouse-wheel-zoom',
            'setting-scroll-beyond',
            'setting-render-whitespace',
            'setting-bracket-colors',
            'setting-linked-editing',
            'setting-inline-suggest',
            'setting-hover',
            'setting-folding',
            'setting-glyph-margin',
            'setting-occurrences-highlight',
            'setting-selection-highlight',
            'setting-color-decorators'
        ];
        editorToggleIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', () => applyEditorPrefsFromPanel());
        });
        const ts = document.getElementById('setting-tab-size');
        if (ts) ts.addEventListener('change', () => applyEditorPrefsFromPanel());
        const cs = document.getElementById('setting-cursor-style');
        if (cs) cs.addEventListener('change', () => applyEditorPrefsFromPanel());
        const cb = document.getElementById('setting-cursor-blink');
        if (cb) cb.addEventListener('change', () => applyEditorPrefsFromPanel());
    }

    function initSettingsPanel() {
        mountSettingsPanel()
            .then(() => initSettingsPanelBind())
            .catch(() => initSettingsPanelBind());
    }

    global.EDITOR_PREFS_KEY = EDITOR_PREFS_KEY;
    global.getDefaultEditorPrefs = getDefaultEditorPrefs;
    global.getEditorPrefs = getEditorPrefs;
    global.saveEditorPrefs = saveEditorPrefs;
    global.openSettingsPanel = openSettingsPanel;
    global.closeSettingsPanel = closeSettingsPanel;
    global.syncSettingsPanelFromPrefs = syncSettingsPanelFromPrefs;
    global.applyEditorPrefsFromPanel = applyEditorPrefsFromPanel;
    global.initSettingsPanel = initSettingsPanel;
    global.mountSettingsPanel = mountSettingsPanel;
})(typeof window !== 'undefined' ? window : globalThis);
