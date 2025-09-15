let editor;

// Import Monaco Editor styles and themes
// This script should be loaded after monaco-style.js

// --- Initialize theme ---
if (!document.documentElement.getAttribute('theme')) {
    document.documentElement.setAttribute('theme', 'light');
}

// --- Theme helper functions ---
function getCurrentTheme() {
    return document.documentElement.getAttribute('theme') || 'light';
}

function setTheme(theme, customTheme = null) {
    document.documentElement.setAttribute('theme', theme);
    const isDarkMode = theme === 'dark';

    if (editor) {
        let monacoTheme;

        if (customTheme === 'dragan') {
            monacoTheme = 'dragan';
        } else {
            // Use VS Code themes instead of default Monaco themes
            monacoTheme = isDarkMode ? 'vs-code-dark' : 'vs-code-light';
        }

        monaco.editor.setTheme(monacoTheme);

        // Update line highlighting colors
        updateLineColors(isDarkMode);

        // Update selection colors to match theme
        updateSelectionColors(isDarkMode);

        // Store theme preferences
        localStorage.setItem('monaco_theme', theme);
        if (customTheme) {
            localStorage.setItem('monaco_custom_theme', customTheme);
        } else {
            localStorage.removeItem('monaco_custom_theme');
        }

        // Update editor data attributes for CSS targeting
        const editorElement = editor.getDomNode();
        if (editorElement) {
            if (customTheme === 'dragan') {
                editorElement.setAttribute('data-theme', 'dragan');
            } else {
                editorElement.removeAttribute('data-theme');
                // Refresh VS Code themes to use current CSS variables
                setTimeout(() => refreshVSCodeThemes(), 50);
            }
        }
    }

    updateThemeIcon(theme, customTheme);
}

function updateThemeIcon(theme, customTheme = null) {
    const iconElement = document.getElementById('darkModeIcon');
    if (iconElement) {
        if (customTheme === 'dragan') {
            iconElement.className = 'fas fa-palette';
        } else {
            iconElement.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

function setDraganTheme() {
    if (!editor) return;

    // Define the theme if not already defined
    defineDraganTheme();

    // Set the theme (data attributes are handled in setTheme)
    setTheme('dark', 'dragan');

    // Refresh minimap styles and line numbers
    refreshMinimapStyles();
    refreshLineNumbers();

    updateFooterStatus('Dragan Color Theme activated! 🎨', 'palette');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 3000);

    console.log('🎨 Switched to Dragan Color Theme');
}

function updateLineColors(isDarkMode) {
    if (!editor) return;

    // Force Monaco to update its styles by triggering a layout
    setTimeout(() => {
        editor.layout();

        // Update current line decoration
        const model = editor.getModel();
        if (model) {
            const position = editor.getPosition();
            if (position) {
                // Trigger a small change to refresh decorations
                editor.setPosition(position);
            }
        }
    }, 50);
}

function updateSelectionColors(isDarkMode) {
    if (!editor) return;

    // Force Monaco to refresh its theme-dependent styles
    setTimeout(() => {
        // Trigger a layout update to apply new CSS
        editor.layout();

        // Force refresh of selection decorations by briefly changing selection
        const selection = editor.getSelection();
        if (selection && !selection.isEmpty()) {
            // Temporarily clear and restore selection to refresh colors
            editor.setSelection(new monaco.Selection(1, 1, 1, 1));
            setTimeout(() => {
                editor.setSelection(selection);
            }, 10);
        }

        // Update any active find decorations
        const model = editor.getModel();
        if (model) {
            // Trigger find widget refresh if it's open
            const findWidget = editor.getContribution('editor.contrib.findController');
            if (findWidget && findWidget.getState().isRevealed) {
                // Force find decorations to update
                editor.trigger('updateSelectionColors', 'actions.find');
            }
        }
    }, 100);
}

function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const currentCustomTheme = localStorage.getItem('monaco_custom_theme');

    // If currently using Dragan theme, switch to regular themes
    if (currentCustomTheme === 'dragan') {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme); // This will clear custom theme
        updateFooterStatus(`Switched to ${newTheme} theme`, 'paint-brush');
    } else {
        // Regular theme toggle
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        updateFooterStatus(`Switched to ${newTheme} theme`, 'paint-brush');
    }

    saveToLocalStorage();
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
}

// Theme functions will be exported globally later

/* Theme API usage:
 * getCurrentTheme() - returns 'light' or 'dark'
 * setTheme('dark') - sets dark theme
 * setTheme('light') - sets light theme  
 * toggleTheme() - toggles between themes
 */
// --- Monaco Editor Configuration ---
function getEditorSettings() {
    return {
        appearance: {
            fontFamily: 'Share Tech Mono, Consolas, Monaco, monospace',
            fontSize: 14,
            lineHeight: 21,
            letterSpacing: 0
        },
        features: {
            formatOnType: { default: true },
            autoClosingBrackets: { default: true },
            bracketPairs: { default: true },
            hover: { default: true },
            suggestions: { default: true },
            lineNumbers: { default: true },
            minimap: { default: true },
            wordWrap: { default: true }
        },
        indentation: {
            tabSize: { default: 4 },
            insertSpaces: { default: true }
        },
        advanced: {
            formatOnPaste: true,
            cursorBlinking: 'blink',
            cursorStyle: 'line',
            scrollBeyondLastLine: false,
            renderWhitespace: 'none',
            linkedEditing: true,
            smoothScrolling: true,
            mouseWheelZoom: true,
            contextmenu: true,
            selectOnLineNumbers: true,
            glyphMargin: true,
            folding: true,
            foldingStrategy: 'auto',
            showFoldingControls: 'mouseover',
            matchBrackets: 'always',
            autoIndent: 'full',
            colorDecorators: true,
            codeLens: true,
            lightbulb: { enabled: true }
        }
    };
}

function getDefaultContent() {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Hello, World!</title>
    <style>
        body { 
            font-family: sans-serif; 
            text-align: center; 
            padding-top: 50px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            margin: 0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        p {
            font-size: 1.2em;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Advanced Code Editor</h1>
        <p>Welcome to your Monaco-powered code editor!</p>
        <p>Start coding and see your changes live in the preview.</p>
    </div>
</body>
</html>`;
}

function getDefaultEditorOptions() {
    const settings = getEditorSettings();
    const isDarkMode = getCurrentTheme() === 'dark';

    return {
        value: getDefaultContent(),
        language: 'html',
        theme: isDarkMode ? 'vs-dark' : 'vs-light',
        fontFamily: settings.appearance.fontFamily.default,
        fontSize: settings.appearance.fontSize.default,
        lineHeight: settings.appearance.lineHeight.default,
        letterSpacing: settings.appearance.letterSpacing.default,
        fontLigatures: true,
        formatOnPaste: settings.advanced.formatOnPaste.default,
        formatOnType: settings.features.formatOnType.default,
        autoClosingBrackets: settings.features.autoClosingBrackets.default ? 'always' : 'never',
        autoClosingQuotes: 'always',
        autoClosingOvertype: 'always',
        autoClosingDelete: 'always',
        autoIndent: 'full',
        autoSurround: 'quotes',
        matchBrackets: 'always',
        renderIndentGuides: true,
        highlightActiveIndentGuide: true,
        guides: {
            bracketPairs: true,
            bracketPairsHorizontal: true,
            highlightActiveBracketPair: true,
            indentation: true,
            highlightActiveIndentation: true
        },
        bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true
        },
        hover: {
            enabled: settings.features.hover.default,
            delay: 300
        },
        inlineSuggest: {
            enabled: settings.features.suggestions.default,
            mode: 'prefix'
        },
        lineNumbers: settings.features.lineNumbers.default ? 'on' : 'off',
        minimap: {
            enabled: settings.features.minimap.default,
            maxColumn: 120,
            renderCharacters: true,
            scale: 1,
            showSlider: 'mouseover',
            side: 'right',
            size: 'proportional'
        },
        wordWrap: settings.features.wordWrap.default ? 'on' : 'off',
        automaticLayout: true,
        tabSize: parseInt(settings.indentation.tabSize.default),
        insertSpaces: settings.indentation.insertSpaces.default,
        cursorBlinking: settings.advanced.cursorBlinking.default,
        cursorStyle: settings.advanced.cursorStyle.default,
        scrollBeyondLastLine: settings.advanced.scrollBeyondLastLine.default,
        renderWhitespace: settings.advanced.renderWhitespace.default ? 'all' : 'none',
        linkedEditing: settings.advanced.linkedEditing.default,
        renderLineHighlight: 'all',
        lineNumbersMinChars: 3,
        occurrencesHighlight: true,
        selectionHighlight: true,
        foldingHighlight: true,
        colorDecorators: true,
        validate: true,
        diagnostics: {
            noSemanticValidation: false,
            noSyntaxValidation: false
        },
        lightbulb: {
            enabled: true
        },
        suggest: {
            enabled: true,
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
            other: true,
            comments: true,
            strings: true
        }
    };
}

// --- Monaco Editor Initialization ---
function initializeEditor() {
    console.log('🚀 Starting Monaco Editor initialization...');

    // Load saved theme before creating editor
    loadSavedTheme();

    // Get default editor options with all configurations
    const editorOptions = getDefaultEditorOptions();

    // Try to import code from app.js if available
    try {
        if (typeof appHtmlContent !== 'undefined') {
            editorOptions.value = appHtmlContent;
        } else {
            console.warn('appHtmlContent not found in app.js, using default content');
        }
    } catch (error) {
        console.error('Error importing from app.js:', error);
    }

    // Create Monaco Editor with comprehensive configuration
    console.log('📝 Creating Monaco Editor instance...');
    editor = monaco.editor.create(document.getElementById('editor'), editorOptions);
    console.log('✅ Monaco Editor instance created successfully');


    // Add cursor position tracking
    editor.onDidChangeCursorPosition((e) => {
        const position = e.position;
        const totalLines = editor.getModel().getLineCount();
        updateFooterStatus(`Line ${position.lineNumber}, Column ${position.column} (${totalLines} lines total)`, 'map-marker-alt');

        // Clear status after 3 seconds
        setTimeout(() => {
            updateFooterStatus('Ready', 'circle');
        }, 3000);
    });

    // Add selection tracking
    editor.onDidChangeCursorSelection((e) => {
        const selection = e.selection;
        if (!selection.isEmpty()) {
            const selectedText = editor.getModel().getValueInRange(selection);
            const lines = selectedText.split('\n').length;
            const chars = selectedText.length;
            updateFooterStatus(`Selected: ${chars} chars, ${lines} lines`, 'highlighter');

            setTimeout(() => {
                updateFooterStatus('Ready', 'circle');
            }, 3000);
        }
    });

    // Auto-save with debouncing
    let saveTimeout;
    editor.onDidChangeModelContent(() => {
        // Auto-preview disabled - use Run button to update preview

        // Debounced save
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveToLocalStorage, 1000);
    });

    // Initialize additional features
    initializeColorDecorations();
    initializeBracketGuides();
    initializeRippleEffect();
    initializeSyntaxHighlighting();

    // Define custom themes
    defineDraganTheme();
    defineVSCodeThemes();

    // Set initial language-specific styles
    const initialLanguage = editor.getModel().getLanguageId();
    updateLanguageSpecificStyles(initialLanguage);

    // Load saved color mode
    const savedColorMode = localStorage.getItem('monaco_color_mode');
    if (savedColorMode === 'neon') {
        setColorMode('neon');
    }

    // Enable advanced Monaco features immediately - no delay needed
    enableAdvancedMonacoFeatures();

    // Initialize new advanced Monaco API features
    addCustomMonacoActions();
    configureAdvancedMonacoFeatures();
    addEditorDecorations();
    enhancedFindReplace();
    setupEnhancedIntelliSense();

    // Check if user had a custom theme saved
    const savedCustomTheme = localStorage.getItem('monaco_custom_theme');
    if (savedCustomTheme === 'dragan') {
        setDraganTheme();
    }

    // Auto-load saved state immediately after editor is ready
    loadFromLocalStorage(false); // false = auto-load, no confirmation

    // Set default view mode to split view if no saved state
    const savedState = localStorage.getItem('monaco_editor_state');
    if (!savedState) {
        setPreviewMode('split');
    }

    // Setup CSS variable observer for VS Code themes
    setupCSSVariableObserver();

    console.log('🎉 Monaco Editor initialization completed successfully!');
}

if (typeof monaco !== 'undefined') {
    // Monaco is already loaded
    initializeEditor();
} else {
    // Load Monaco Editor loader dynamically
    const loaderScript = document.createElement('script');
    loaderScript.src = 'loader.min.js';
    loaderScript.onload = function () {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs' } });
        require(['vs/editor/editor.main'], initializeEditor);
    };
    loaderScript.onerror = function () {
        console.error('Failed to load Monaco Editor loader');
    };
    document.head.appendChild(loaderScript);
}


// Color picker decorations
let colorDecorations = [];

function initializeColorDecorations() {
    if (!editor) return;

    // Listen for content changes to update color decorations
    editor.onDidChangeModelContent(() => {
        setTimeout(updateColorDecorations, 100);
    });

    // Initial update - immediate
    setTimeout(updateColorDecorations, 100);
}

function updateColorDecorations() {
    if (!editor) return;

    const model = editor.getModel();
    const text = model.getValue();

    // Color patterns to match
    const colorPatterns = [
        /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g,              // Hex colors
        /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,       // RGB colors
        /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/g, // RGBA colors
    ];

    const decorations = [];
    const lines = text.split('\n');

    lines.forEach((line, lineIndex) => {
        colorPatterns.forEach(pattern => {
            let match;
            pattern.lastIndex = 0; // Reset regex

            while ((match = pattern.exec(line)) !== null) {
                const color = match[0];
                const startColumn = match.index + 1;
                const endColumn = startColumn + color.length;

                decorations.push({
                    range: new monaco.Range(lineIndex + 1, startColumn, lineIndex + 1, endColumn),
                    options: {
                        overviewRuler: {
                            color: color,
                            position: monaco.editor.OverviewRulerLane.Right
                        }
                    }
                });
            }
        });
    });

    colorDecorations = editor.deltaDecorations(colorDecorations, decorations);
}

// Bracket guides toggle
let bracketGuidesEnabled = true;

function initializeBracketGuides() {
    // Bracket guides are enabled by default in Monaco config
    updateFooterStatus('Bracket guides enabled', 'code');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
}

function toggleBracketGuides() {
    if (!editor) return;

    bracketGuidesEnabled = !bracketGuidesEnabled;

    editor.updateOptions({
        renderIndentGuides: bracketGuidesEnabled,
        highlightActiveIndentGuide: bracketGuidesEnabled,
        guides: {
            bracketPairs: bracketGuidesEnabled,
            indentation: bracketGuidesEnabled
        }
    });

    if (bracketGuidesEnabled) {
        updateFooterStatus('Bracket guides enabled', 'code');
    } else {
        updateFooterStatus('Bracket guides disabled', 'code');
    }

    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
}

// Function to get current bracket guides state
function getBracketGuidesState() {
    if (!editor) return null;

    const options = editor.getOptions();
    return {
        bracketPairs: options.get(monaco.editor.EditorOption.guides)?.bracketPairs || false,
        indentation: options.get(monaco.editor.EditorOption.guides)?.indentation || false,
        renderIndentGuides: options.get(monaco.editor.EditorOption.renderIndentGuides),
        highlightActiveIndentGuide: options.get(monaco.editor.EditorOption.highlightActiveIndentGuide)
    };
}


// Function to set specific bracket guides configuration
function setBracketGuidesConfig(bracketPairs, indentation) {
    if (!editor) return;

    editor.updateOptions({
        guides: {
            bracketPairs: bracketPairs,
            indentation: indentation
        },
        renderIndentGuides: indentation,
        highlightActiveIndentGuide: indentation
    });

    updateFooterStatus(`Guides: Brackets(${bracketPairs}), Indent(${indentation})`, 'cogs');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 3000);
}

// Function to show current bracket guides status in console (for debugging)
function showBracketGuidesStatus() {
    if (!editor) {
        console.log('❌ Editor not initialized');
        return;
    }

    const state = getBracketGuidesState();
    console.log('<i class="fas fa-cogs"></i> Bracket Guides Status:');
    console.log('  <i class="fas fa-brackets-curly"></i> Bracket Pairs:', state.bracketPairs ? '<i class="fas fa-check"></i> ON' : '<i class="fas fa-times"></i> OFF');
    console.log('  <i class="fas fa-indent"></i> Indentation:', state.indentation ? '<i class="fas fa-check"></i> ON' : '<i class="fas fa-times"></i> OFF');
    console.log('  <i class="fas fa-eye"></i> Render Indent Guides:', state.renderIndentGuides ? '<i class="fas fa-check"></i> ON' : '<i class="fas fa-times"></i> OFF');
    console.log('  <i class="fas fa-highlight"></i> Highlight Active:', state.highlightActiveIndentGuide ? '<i class="fas fa-check"></i> ON' : '<i class="fas fa-times"></i> OFF');

    updateFooterStatus('Guide status logged to console', 'info-circle');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 3000);

    return state;
}







function goToLine(lineNumber) {
    if (!editor) return;

    editor.setPosition({ lineNumber: lineNumber, column: 1 });
    editor.revealLineInCenter(lineNumber);
    editor.focus();

    // Close the problems panel
    const modal = document.getElementById('customModal');
    if (modal) modal.remove();
}

function initializeSyntaxHighlighting() {
    if (!editor) return;

    // Apply initial syntax highlighting
    const currentLanguage = editor.getModel().getLanguageId();
    applySyntaxHighlighting(currentLanguage);

    // Listen for model language changes
    editor.onDidChangeModelLanguage((e) => {
        const newLanguage = e.newLanguage;
        applySyntaxHighlighting(newLanguage);
        updateFooterStatus(`Language changed to ${newLanguage.toUpperCase()}`, 'code');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    });

    // Enhanced syntax highlighting for specific tokens
    setTimeout(() => {
        enhanceSyntaxTokens();
        // Apply enhanced bracket pair guides styling
        if (typeof applyBracketPairGuidesStyling === 'function') {
            applyBracketPairGuidesStyling();
        }
    }, 500);
}

function enhanceSyntaxTokens() {
    if (!editor) return;

    // Add custom CSS classes for enhanced syntax highlighting
    const editorElement = editor.getDomNode();
    if (editorElement) {
        editorElement.classList.add('enhanced-syntax-highlighting');
        // Removed old colorful-brackets class - using Dragan theme specific implementation
    }

    // Enable bracket pair colorization with correct Monaco Editor API
    editor.updateOptions({
        // Bracket matching and highlighting
        matchBrackets: 'always',
        renderLineHighlight: 'all',

        // Indent guides
        renderIndentGuides: true,
        highlightActiveIndentGuide: true,

        // These options may not be supported in older Monaco versions
        // Using alternative approach through CSS and manual configuration
    });

    // Enhanced bracket pair colorization and guides
    try {
        editor.updateOptions({
            bracketPairColorization: {
                enabled: true,
                independentColorPoolPerBracketType: true
            },
            guides: {
                bracketPairs: true,
                bracketPairsHorizontal: true,
                highlightActiveBracketPair: true,
                indentation: true,
                highlightActiveIndentation: true
            },
            // Enhanced bracket matching for curly braces {}
            matchBrackets: 'always',
            autoClosingBrackets: 'always',
            autoClosingOvertype: 'always'
        });
        console.log('✅ Enhanced bracket pair colorization and guides enabled');
    } catch (e) {
        console.log('Some bracket features not supported, using fallback configuration');
        // Fallback configuration
        editor.updateOptions({
            guides: {
                bracketPairs: true,
                indentation: true
            },
            matchBrackets: 'always',
            autoClosingBrackets: 'always'
        });
    }

    // Try to enable guides if supported
    try {
        if (monaco.editor.EditorOption && monaco.editor.EditorOption.guides) {
            editor.updateOptions({
                guides: {
                    bracketPairs: true,
                    indentation: true,
                    highlightActiveIndentation: true,
                }
            });
        }
    } catch (e) {
        console.log('Advanced guides not supported in this Monaco version, using CSS fallback');
    }

    // Force a re-render to apply new styles
    editor.layout();

    // Old colorful bracket effects removed - using Dragan theme specific implementation

    updateFooterStatus('Enhanced syntax highlighting activated', 'palette');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
}



// refreshVSCodeThemes moved to monaco-style.js

// setupCSSVariableObserver moved to monaco-style.js

// toggleVSCodeThemeLogging moved to monaco-style.js

function enableAdvancedMonacoFeatures() {
    if (!editor) return;

    console.log('🔧 Attempting to enable advanced Monaco Editor features...');

    // Check Monaco Editor version and available features
    const monacoVersion = monaco.version || 'unknown';
    console.log(`📦 Monaco Editor version: ${monacoVersion}`);

    let featuresEnabled = [];
    let featuresFailed = [];

    // Try bracket pair colorization
    try {
        editor.updateOptions({
            'bracketPairColorization.enabled': true,
            'bracketPairColorization.independentColorPoolPerBracketType': true,
        });
        featuresEnabled.push('Bracket Pair Colorization');
        console.log('✅ Bracket pair colorization enabled');
    } catch (e) {
        featuresFailed.push('Bracket Pair Colorization');
        console.log('❌ Bracket pair colorization failed:', e.message);
    }

    // Try advanced guides
    try {
        editor.updateOptions({
            'guides.bracketPairs': true,
            'guides.bracketPairsHorizontal': true,
            'guides.highlightActiveBracketPair': true,
            'guides.indentation': true,
            'guides.highlightActiveIndentation': true,
        });
        featuresEnabled.push('Advanced Guides');
        console.log('✅ Advanced guides enabled');
    } catch (e) {
        featuresFailed.push('Advanced Guides');
        console.log('❌ Advanced guides failed:', e.message);
    }

    // Alternative approach using editor options API
    try {
        const currentOptions = editor.getOptions();
        console.log('📋 Current editor options available:', Object.keys(currentOptions._values || {}));

        // Try using the editor options API directly
        if (currentOptions.get && monaco.editor.EditorOption) {
            // Try to set bracket pair colorization
            if (monaco.editor.EditorOption.bracketPairColorization) {
                editor.updateOptions({
                    [monaco.editor.EditorOption.bracketPairColorization]: {
                        enabled: true,
                        independentColorPoolPerBracketType: true,
                    }
                });
                console.log('✅ Bracket pair colorization enabled via EditorOption API');
            }
        }
    } catch (e) {
        console.log('❌ EditorOption API failed:', e.message);
    }

    // Force layout refresh
    editor.layout();

    // Update status
    const statusMessage = featuresEnabled.length > 0
        ? `Advanced features enabled: ${featuresEnabled.join(', ')}`
        : 'Using CSS fallback for bracket colorization';

    updateFooterStatus(statusMessage, 'cogs');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 3000);

    console.log('🎨 Advanced Monaco features setup complete');
    if (featuresEnabled.length > 0) {
        console.log('✅ Enabled:', featuresEnabled.join(', '));
    }
    if (featuresFailed.length > 0) {
        console.log('❌ Failed:', featuresFailed.join(', '), '- Using CSS fallback');
    }
}


// Global functions
window.toggleBracketGuides = toggleBracketGuides;
window.setBracketGuidesConfig = setBracketGuidesConfig;
window.getBracketGuidesState = getBracketGuidesState;
window.showBracketGuidesStatus = showBracketGuidesStatus;
window.goToLine = goToLine;
window.applySyntaxHighlighting = applySyntaxHighlighting;
window.enhanceSyntaxTokens = enhanceSyntaxTokens;
window.enableAdvancedMonacoFeatures = enableAdvancedMonacoFeatures;



// applyEnhancedInterface moved to monaco-style.js

// window.updateInterfaceColors = updateInterfaceColors; // moved to monaco-style.js
// window.applyEnhancedInterface = applyEnhancedInterface; // moved to monaco-style.js
// Set default theme to Dragan
function setDefaultTheme() {
    // Clear any existing theme settings
    localStorage.removeItem('monaco_theme');
    localStorage.removeItem('monaco_custom_theme');
    localStorage.removeItem('monaco_color_mode');

    // Set Dragan as default
    setDraganTheme();
    updateFooterStatus('🎨 Dragan theme set as default!', 'palette');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 3000);
}

// Make functions globally available (consolidated)
window.getCurrentTheme = getCurrentTheme;
window.setTheme = setTheme;
window.toggleTheme = toggleTheme;
window.updateThemeIcon = updateThemeIcon;
window.defineDraganTheme = defineDraganTheme;
window.setDraganTheme = setDraganTheme;
window.setDefaultTheme = setDefaultTheme;
window.updateLanguageSpecificStyles = updateLanguageSpecificStyles;
window.toggleColorMode = toggleColorMode;
window.setColorMode = setColorMode;
window.refreshMinimapStyles = refreshMinimapStyles;
// VS Code Theme Integration (functions moved to monaco-style.js)
// window.defineVSCodeThemes = defineVSCodeThemes;
// window.refreshVSCodeThemes = refreshVSCodeThemes;
// window.setupCSSVariableObserver = setupCSSVariableObserver;
// window.toggleVSCodeThemeLogging = toggleVSCodeThemeLogging;
window.refreshLineNumbers = refreshLineNumbers;

// --- Advanced Monaco Editor API Functions ---

// Custom Monaco Editor Actions
function addCustomMonacoActions() {
    if (!editor) return;

    // Toggle Word Wrap
    editor.addAction({
        id: 'toggle-word-wrap',
        label: 'Toggle Word Wrap',
        keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.KeyZ],
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: function (ed) {
            const currentWrap = ed.getOption(monaco.editor.EditorOption.wordWrap);
            const newWrap = currentWrap === 'on' ? 'off' : 'on';
            ed.updateOptions({ wordWrap: newWrap });
            updateFooterStatus(`Word wrap ${newWrap}`, 'text-width');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    });

    // Toggle Minimap
    editor.addAction({
        id: 'toggle-minimap',
        label: 'Toggle Minimap',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyM],
        contextMenuGroupId: 'view',
        contextMenuOrder: 1.5,
        run: function (ed) {
            const currentMinimap = ed.getOption(monaco.editor.EditorOption.minimap);
            const newEnabled = !currentMinimap.enabled;
            ed.updateOptions({ minimap: { enabled: newEnabled } });
            updateFooterStatus(`Minimap ${newEnabled ? 'enabled' : 'disabled'}`, 'map');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    });

    // Insert Current Date/Time
    editor.addAction({
        id: 'insert-datetime',
        label: 'Insert Current Date/Time',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyD],
        contextMenuGroupId: 'edit',
        contextMenuOrder: 1.5,
        run: function (ed) {
            const now = new Date();
            const dateTime = now.toLocaleString();
            const selection = ed.getSelection();
            ed.executeEdits('insert-datetime', [{
                range: selection,
                text: dateTime
            }]);
            updateFooterStatus('Date/time inserted', 'calendar');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    });

    // Duplicate Line
    editor.addAction({
        id: 'duplicate-line',
        label: 'Duplicate Line',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyK],
        contextMenuGroupId: 'edit',
        contextMenuOrder: 2.5,
        run: function (ed) {
            ed.trigger('source', 'editor.action.copyLinesDownAction');
            updateFooterStatus('Line duplicated', 'copy');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    });

    // Select All Occurrences
    editor.addAction({
        id: 'select-all-occurrences',
        label: 'Select All Occurrences',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyL],
        contextMenuGroupId: 'selection',
        contextMenuOrder: 1.5,
        run: function (ed) {
            ed.trigger('source', 'editor.action.selectHighlights');
            updateFooterStatus('All occurrences selected', 'highlighter');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    });

    console.log('🎯 Custom Monaco Editor actions added successfully');
}

// Advanced Editor Configuration
function configureAdvancedMonacoFeatures() {
    if (!editor) return;

    try {
        // Enable advanced bracket pair colorization
        editor.updateOptions({
            'bracketPairColorization.enabled': true,
            'bracketPairColorization.independentColorPoolPerBracketType': true,
            'guides.bracketPairs': true,
            'guides.bracketPairsHorizontal': true,
            'guides.highlightActiveBracketPair': true,
            'guides.indentation': true,
            'guides.highlightActiveIndentation': true,
        });

        // Enhanced IntelliSense
        editor.updateOptions({
            quickSuggestions: {
                other: true,
                comments: true,
                strings: true
            },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: 'on',
            wordBasedSuggestions: true,
            parameterHints: {
                enabled: true,
                cycle: true
            }
        });

        // Advanced editing features
        editor.updateOptions({
            multiCursorModifier: 'alt',
            multiCursorMergeOverlapping: true,
            selectionClipboard: true,
            find: {
                addExtraSpaceOnTop: true,
                autoFindInSelection: 'never',
                seedSearchStringFromSelection: 'always'
            }
        });

        console.log('🚀 Advanced Monaco features configured');
        updateFooterStatus('Advanced features enabled', 'cogs');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);

    } catch (error) {
        console.warn('Some advanced features not supported:', error);
        updateFooterStatus('Basic features enabled', 'cog');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    }
}

// Monaco Editor Decorations Manager
function addEditorDecorations() {
    if (!editor) return;

    let currentDecorations = [];

    // Highlight TODO comments
    function highlightTodos() {
        const model = editor.getModel();
        const text = model.getValue();
        const lines = text.split('\n');
        const decorations = [];

        lines.forEach((line, index) => {
            const todoMatch = line.match(/(TODO|FIXME|HACK|NOTE|BUG):/i);
            if (todoMatch) {
                const startColumn = line.indexOf(todoMatch[0]) + 1;
                const endColumn = startColumn + todoMatch[0].length;

                decorations.push({
                    range: new monaco.Range(index + 1, startColumn, index + 1, endColumn),
                    options: {
                        className: 'todo-decoration',
                        hoverMessage: { value: `**${todoMatch[1]}** comment found` },
                        minimap: {
                            color: '',
                            position: monaco.editor.MinimapPosition.Inline
                        },
                        overviewRuler: {
                            color: '',
                            position: monaco.editor.OverviewRulerLane.Right
                        }
                    }
                });
            }
        });

        currentDecorations = editor.deltaDecorations(currentDecorations, decorations);
    }

    // Update decorations when content changes
    editor.onDidChangeModelContent(() => {
        setTimeout(highlightTodos, 100);
    });

    // Initial highlight
    setTimeout(highlightTodos, 500);

    console.log('🎨 Editor decorations manager initialized');
}

// Enhanced Find and Replace
function enhancedFindReplace() {
    if (!editor) return;

    // Add custom find action with regex support
    editor.addAction({
        id: 'enhanced-find',
        label: 'Enhanced Find with Regex',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyF],
        run: function (ed) {
            // Get current selection as search term
            const selection = ed.getSelection();
            const selectedText = ed.getModel().getValueInRange(selection);

            // Open find widget with regex enabled
            ed.trigger('source', 'actions.find', {
                searchString: selectedText,
                isRegex: true,
                matchCase: false,
                wholeWord: false
            });

            updateFooterStatus('Enhanced find opened', 'search');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    });

    // Quick replace action
    editor.addAction({
        id: 'quick-replace-selection',
        label: 'Quick Replace Selection',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR],
        run: function (ed) {
            const selection = ed.getSelection();
            const selectedText = ed.getModel().getValueInRange(selection);

            if (selectedText) {
                const replacement = prompt(`Replace "${selectedText}" with:`, selectedText);
                if (replacement !== null) {
                    ed.executeEdits('quick-replace', [{
                        range: selection,
                        text: replacement
                    }]);
                    updateFooterStatus('Text replaced', 'exchange-alt');
                    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
                }
            } else {
                updateFooterStatus('No text selected', 'info-circle');
                setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
            }
        }
    });
}

// Enhanced IntelliSense and Suggestions System
function setupEnhancedIntelliSense() {
    if (!editor) return;

    // HTML Suggestions
    function registerHTMLSuggestions() {
        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: function (model, position) {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };

                const suggestions = [
                    // HTML5 Semantic Elements
                    {
                        label: 'article',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<article>\n\t$0\n</article>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 semantic article element',
                        range: range
                    },
                    {
                        label: 'section',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<section>\n\t$0\n</section>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 semantic section element',
                        range: range
                    },
                    {
                        label: 'nav',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<nav>\n\t<ul>\n\t\t<li><a href="$1">$2</a></li>\n\t</ul>\n</nav>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 navigation element with list',
                        range: range
                    },
                    {
                        label: 'header',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<header>\n\t<h1>$1</h1>\n\t$0\n</header>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 header element',
                        range: range
                    },
                    {
                        label: 'footer',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<footer>\n\t<p>&copy; $1 $2</p>\n</footer>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 footer element',
                        range: range
                    },
                    {
                        label: 'main',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<main>\n\t$0\n</main>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 main content element',
                        range: range
                    },
                    {
                        label: 'aside',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<aside>\n\t$0\n</aside>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'HTML5 aside element for sidebar content',
                        range: range
                    },
                    // Form Elements
                    {
                        label: 'form-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<form action="$1" method="$2">\n\t<label for="$3">$4:</label>\n\t<input type="$5" id="$3" name="$3" required>\n\t<button type="submit">$6</button>\n</form>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete form with label, input and button',
                        range: range
                    },
                    {
                        label: 'input-text',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<input type="text" id="$1" name="$1" placeholder="$2" required>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Text input field',
                        range: range
                    },
                    {
                        label: 'input-email',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<input type="email" id="$1" name="$1" placeholder="Enter email" required>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Email input field',
                        range: range
                    },
                    // Meta Tags
                    {
                        label: 'meta-viewport',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Responsive viewport meta tag',
                        range: range
                    },
                    {
                        label: 'meta-description',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<meta name="description" content="$1">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'SEO description meta tag',
                        range: range
                    },
                    {
                        label: 'meta-keywords',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<meta name="keywords" content="$1">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'SEO keywords meta tag',
                        range: range
                    },
                    // Advanced HTML5 Elements
                    {
                        label: 'html5-boilerplate',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!DOCTYPE html>\n<html lang="$1">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>$2</title>\n\t<link rel="stylesheet" href="$3">\n</head>\n<body>\n\t$0\n\t<script src="$4"></script>\n</body>\n</html>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete HTML5 document boilerplate',
                        range: range
                    },
                    {
                        label: 'table-responsive',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div class="table-responsive">\n\t<table class="table">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>$1</th>\n\t\t\t\t<th>$2</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<td>$3</td>\n\t\t\t\t<td>$4</td>\n\t\t\t</tr>\n\t\t</tbody>\n\t</table>\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Responsive table structure',
                        range: range
                    },
                    {
                        label: 'card-component',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div class="card">\n\t<div class="card-header">\n\t\t<h3>$1</h3>\n\t</div>\n\t<div class="card-body">\n\t\t<p>$2</p>\n\t</div>\n\t<div class="card-footer">\n\t\t<button class="btn">$3</button>\n\t</div>\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Card component with header, body and footer',
                        range: range
                    },
                    {
                        label: 'modal-dialog',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div class="modal" id="$1">\n\t<div class="modal-dialog">\n\t\t<div class="modal-content">\n\t\t\t<div class="modal-header">\n\t\t\t\t<h4 class="modal-title">$2</h4>\n\t\t\t\t<button type="button" class="close" data-dismiss="modal">&times;</button>\n\t\t\t</div>\n\t\t\t<div class="modal-body">\n\t\t\t\t$3\n\t\t\t</div>\n\t\t\t<div class="modal-footer">\n\t\t\t\t<button type="button" class="btn btn-primary">$4</button>\n\t\t\t\t<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Modal dialog component',
                        range: range
                    },
                    {
                        label: 'navbar-responsive',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<nav class="navbar">\n\t<div class="navbar-brand">\n\t\t<a href="$1">$2</a>\n\t</div>\n\t<div class="navbar-toggle" id="navbar-toggle">\n\t\t<span></span>\n\t\t<span></span>\n\t\t<span></span>\n\t</div>\n\t<div class="navbar-menu" id="navbar-menu">\n\t\t<ul class="navbar-nav">\n\t\t\t<li><a href="$3">$4</a></li>\n\t\t\t<li><a href="$5">$6</a></li>\n\t\t</ul>\n\t</div>\n</nav>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Responsive navigation bar',
                        range: range
                    },
                    {
                        label: 'video-responsive',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div class="video-container">\n\t<video controls poster="$1">\n\t\t<source src="$2" type="video/mp4">\n\t\t<source src="$3" type="video/webm">\n\t\t<p>Your browser does not support the video tag.</p>\n\t</video>\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Responsive video player with multiple sources',
                        range: range
                    },
                    {
                        label: 'image-gallery',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<div class="gallery">\n\t<div class="gallery-item">\n\t\t<img src="$1" alt="$2" loading="lazy">\n\t\t<div class="gallery-overlay">\n\t\t\t<h3>$3</h3>\n\t\t\t<p>$4</p>\n\t\t</div>\n\t</div>\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Image gallery item with overlay',
                        range: range
                    }
                ];

                return { suggestions: suggestions };
            }
        });
    }

    // CSS Suggestions
    function registerCSSSuggestions() {
        monaco.languages.registerCompletionItemProvider('css', {
            provideCompletionItems: function (model, position) {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };

                const suggestions = [
                    // Flexbox
                    {
                        label: 'flex-container',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\njustify-content: $1;\nalign-items: $2;\nflex-direction: $3;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete flexbox container setup',
                        range: range
                    },
                    {
                        label: 'flex-center',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: flex;\njustify-content: center;\nalign-items: center;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Center content with flexbox',
                        range: range
                    },
                    // Grid
                    {
                        label: 'grid-container',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: grid;\ngrid-template-columns: $1;\ngrid-template-rows: $2;\ngap: $3;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS Grid container setup',
                        range: range
                    },
                    {
                        label: 'grid-responsive',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'display: grid;\ngrid-template-columns: repeat(auto-fit, minmax($1, 1fr));\ngap: $2;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Responsive CSS Grid',
                        range: range
                    },
                    // Animations
                    {
                        label: 'animation-keyframes',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@keyframes $1 {\n\t0% {\n\t\t$2\n\t}\n\t100% {\n\t\t$3\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS keyframes animation',
                        range: range
                    },
                    {
                        label: 'transition-smooth',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'transition: all 0.3s ease-in-out;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Smooth transition for all properties',
                        range: range
                    },
                    // Media Queries
                    {
                        label: 'media-mobile',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@media (max-width: 768px) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Mobile media query',
                        range: range
                    },
                    {
                        label: 'media-tablet',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@media (min-width: 769px) and (max-width: 1024px) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Tablet media query',
                        range: range
                    },
                    {
                        label: 'media-desktop',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '@media (min-width: 1025px) {\n\t$0\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Desktop media query',
                        range: range
                    },
                    // Advanced CSS Layouts
                    {
                        label: 'css-reset',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '* {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n}\n\nbody {\n\tfont-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;\n\tline-height: 1.6;\n\tcolor: #333;\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Modern CSS reset with typography',
                        range: range
                    },
                    {
                        label: 'button-modern',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '.btn {\n\tdisplay: inline-block;\n\tpadding: 12px 24px;\n\tborder: none;\n\tborder-radius: 0px;\n\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\tcolor: white;\n\tfont-weight: 600;\n\ttext-decoration: none;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\ttransform: translateY(0);\n}\n\n.btn:hover {\n\ttransform: translateY(-2px);\n\tbox-shadow: 0 10px 20px rgba(0,0,0,0.2);\n}\n\n.btn:active {\n\ttransform: translateY(0);\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Modern button with gradient and hover effects',
                        range: range
                    },
                    {
                        label: 'card-hover',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '.card {\n\tbackground: white;\n\tborder-radius: 0px;\n\tbox-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n\tpadding: 24px;\n\ttransition: all 0.3s ease;\n\toverflow: hidden;\n\tposition: relative;\n}\n\n.card:hover {\n\ttransform: translateY(-8px);\n\tbox-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n}\n\n.card::before {\n\tcontent: "";\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 4px;\n\tbackground: linear-gradient(90deg, #667eea, #764ba2);\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Card component with hover effects and gradient accent',
                        range: range
                    },
                    {
                        label: 'loading-spinner',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '.spinner {\n\twidth: 40px;\n\theight: 40px;\n\tborder: 4px solid #f3f3f3;\n\tborder-top: 4px solid #3498db;\n\tborder-radius: 50%;\n\tanimation: spin 1s linear infinite;\n\tmargin: 20px auto;\n}\n\n@keyframes spin {\n\t0% { transform: rotate(0deg); }\n\t100% { transform: rotate(360deg); }\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'CSS loading spinner animation',
                        range: range
                    },
                    {
                        label: 'navbar-sticky',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '.navbar {\n\tposition: sticky;\n\ttop: 0;\n\tz-index: 1000;\n\tbackground: rgba(255, 255, 255, 0.95);\n\tbackdrop-filter: blur(10px);\n\tborder-bottom: 1px solid rgba(0, 0, 0, 0.1);\n\tpadding: 1rem 0;\n\ttransition: all 0.3s ease;\n}\n\n.navbar.scrolled {\n\tpadding: 0.5rem 0;\n\tbox-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Sticky navbar with blur effect',
                        range: range
                    },
                    {
                        label: 'text-gradient',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '.text-gradient {\n\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\t-webkit-background-clip: text;\n\t-webkit-text-fill-color: transparent;\n\tbackground-clip: text;\n\tfont-weight: bold;\n\tdisplay: inline-block;\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Gradient text effect',
                        range: range
                    },
                    {
                        label: 'glassmorphism',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '.glass {\n\tbackground: rgba(255, 255, 255, 0.25);\n\tbox-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);\n\tbackdrop-filter: blur(4px);\n\t-webkit-backdrop-filter: blur(4px);\n\tborder-radius: 0px;\n\tborder: 1px solid rgba(255, 255, 255, 0.18);\n\tpadding: 20px;\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Glassmorphism effect',
                        range: range
                    },
                    {
                        label: 'dark-mode-toggle',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ':root {\n\t--bg-color: #ffffff;\n\t--text-color: #333333;\n\t--accent-color: #667eea;\n}\n\n[data-theme="dark"] {\n\t--bg-color: #1a1a1a;\n\t--text-color: #ffffff;\n\t--accent-color: #764ba2;\n}\n\nbody {\n\tbackground-color: var(--bg-color);\n\tcolor: var(--text-color);\n\ttransition: background-color 0.3s ease, color 0.3s ease;\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Dark mode CSS variables setup',
                        range: range
                    },
                    {
                        label: 'scroll-smooth',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'html {\n\tscroll-behavior: smooth;\n}\n\n.scroll-to-top {\n\tposition: fixed;\n\tbottom: 20px;\n\tright: 20px;\n\twidth: 50px;\n\theight: 50px;\n\tbackground: var(--accent-color, #667eea);\n\tcolor: white;\n\tborder: none;\n\tborder-radius: 50%;\n\tcursor: pointer;\n\topacity: 0;\n\ttransition: opacity 0.3s ease;\n\tz-index: 1000;\n}\n\n.scroll-to-top.visible {\n\topacity: 1;\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Smooth scroll and scroll-to-top button',
                        range: range
                    }
                ];

                return { suggestions: suggestions };
            }
        });
    }

    // JavaScript Suggestions
    function registerJavaScriptSuggestions() {
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: function (model, position) {
                const word = model.getWordUntilPosition(position);
                const range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };

                const suggestions = [
                    // Modern JavaScript
                    {
                        label: 'arrow-function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const $1 = ($2) => {\n\t$0\n};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Arrow function declaration',
                        range: range
                    },
                    {
                        label: 'async-function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const $1 = async ($2) => {\n\ttry {\n\t\t$3\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Async arrow function with error handling',
                        range: range
                    },
                    {
                        label: 'fetch-api',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'fetch(\'$1\')\n\t.then(response => response.json())\n\t.then(data => {\n\t\t$2\n\t})\n\t.catch(error => {\n\t\tconsole.error(\'Error:\', error);\n\t});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Fetch API with error handling',
                        range: range
                    },
                    {
                        label: 'fetch-async',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const fetchData = async () => {\n\ttry {\n\t\tconst response = await fetch(\'$1\');\n\t\tconst data = await response.json();\n\t\t$2\n\t} catch (error) {\n\t\tconsole.error(\'Error:\', error);\n\t}\n};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Async/await fetch function',
                        range: range
                    },
                    // DOM Manipulation
                    {
                        label: 'dom-ready',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'document.addEventListener(\'DOMContentLoaded\', () => {\n\t$0\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'DOM ready event listener',
                        range: range
                    },
                    {
                        label: 'query-selector',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const $1 = document.querySelector(\'$2\');',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Query selector',
                        range: range
                    },
                    {
                        label: 'event-listener',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '$1.addEventListener(\'$2\', (event) => {\n\t$3\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Add event listener',
                        range: range
                    },
                    // ES6+ Features
                    {
                        label: 'destructuring-object',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const { $1 } = $2;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Object destructuring',
                        range: range
                    },
                    {
                        label: 'destructuring-array',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const [$1] = $2;',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array destructuring',
                        range: range
                    },
                    {
                        label: 'template-literal',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '`$1${$2}$3`',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Template literal with interpolation',
                        range: range
                    },
                    // Advanced JavaScript Patterns
                    {
                        label: 'class-modern',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'class $1 {\n\tconstructor($2) {\n\t\t$3\n\t}\n\n\t$4() {\n\t\t$5\n\t}\n\n\tstatic $6() {\n\t\t$7\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Modern ES6 class with constructor and static method',
                        range: range
                    },
                    {
                        label: 'promise-chain',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'new Promise((resolve, reject) => {\n\t$1\n})\n.then(result => {\n\t$2\n})\n.catch(error => {\n\tconsole.error(\'Error:\', error);\n})\n.finally(() => {\n\t$3\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Promise with then/catch/finally chain',
                        range: range
                    },
                    {
                        label: 'debounce-function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const debounce = (func, delay) => {\n\tlet timeoutId;\n\treturn (...args) => {\n\t\tclearTimeout(timeoutId);\n\t\ttimeoutId = setTimeout(() => func.apply(this, args), delay);\n\t};\n};\n\n// Usage: const debouncedFunction = debounce($1, $2);',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Debounce function utility',
                        range: range
                    },
                    {
                        label: 'throttle-function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const throttle = (func, limit) => {\n\tlet inThrottle;\n\treturn function() {\n\t\tconst args = arguments;\n\t\tconst context = this;\n\t\tif (!inThrottle) {\n\t\t\tfunc.apply(context, args);\n\t\t\tinThrottle = true;\n\t\t\tsetTimeout(() => inThrottle = false, limit);\n\t\t}\n\t};\n};\n\n// Usage: const throttledFunction = throttle($1, $2);',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Throttle function utility',
                        range: range
                    },
                    {
                        label: 'local-storage',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const storage = {\n\tset: (key, value) => {\n\t\ttry {\n\t\t\tlocalStorage.setItem(key, JSON.stringify(value));\n\t\t} catch (error) {\n\t\t\tconsole.error(\'Storage set error:\', error);\n\t\t}\n\t},\n\tget: (key, defaultValue = null) => {\n\t\ttry {\n\t\t\tconst item = localStorage.getItem(key);\n\t\t\treturn item ? JSON.parse(item) : defaultValue;\n\t\t} catch (error) {\n\t\t\tconsole.error(\'Storage get error:\', error);\n\t\t\treturn defaultValue;\n\t\t}\n\t},\n\tremove: (key) => localStorage.removeItem(key),\n\tclear: () => localStorage.clear()\n};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Local storage utility with error handling',
                        range: range
                    },
                    {
                        label: 'api-client',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'class ApiClient {\n\tconstructor(baseURL) {\n\t\tthis.baseURL = baseURL;\n\t\tthis.headers = {\n\t\t\t\'Content-Type\': \'application/json\'\n\t\t};\n\t}\n\n\tasync request(endpoint, options = {}) {\n\t\tconst url = `${this.baseURL}${endpoint}`;\n\t\tconst config = {\n\t\t\theaders: { ...this.headers, ...options.headers },\n\t\t\t...options\n\t\t};\n\n\t\ttry {\n\t\t\tconst response = await fetch(url, config);\n\t\t\tif (!response.ok) {\n\t\t\t\tthrow new Error(`HTTP error! status: ${response.status}`);\n\t\t\t}\n\t\t\treturn await response.json();\n\t\t} catch (error) {\n\t\t\tconsole.error(\'API request failed:\', error);\n\t\t\tthrow error;\n\t\t}\n\t}\n\n\tget(endpoint) {\n\t\treturn this.request(endpoint, { method: \'GET\' });\n\t}\n\n\tpost(endpoint, data) {\n\t\treturn this.request(endpoint, {\n\t\t\tmethod: \'POST\',\n\t\t\tbody: JSON.stringify(data)\n\t\t});\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'API client class with error handling',
                        range: range
                    },
                    {
                        label: 'form-validation',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const validateForm = (formData, rules) => {\n\tconst errors = {};\n\n\tfor (const [field, value] of Object.entries(formData)) {\n\t\tconst fieldRules = rules[field];\n\t\tif (!fieldRules) continue;\n\n\t\tif (fieldRules.required && (!value || value.trim() === \'\')) {\n\t\t\terrors[field] = `${field} is required`;\n\t\t\tcontinue;\n\t\t}\n\n\t\tif (fieldRules.minLength && value.length < fieldRules.minLength) {\n\t\t\terrors[field] = `${field} must be at least ${fieldRules.minLength} characters`;\n\t\t}\n\n\t\tif (fieldRules.pattern && !fieldRules.pattern.test(value)) {\n\t\t\terrors[field] = fieldRules.message || `${field} format is invalid`;\n\t\t}\n\t}\n\n\treturn {\n\t\tisValid: Object.keys(errors).length === 0,\n\t\terrors\n\t};\n};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Form validation utility function',
                        range: range
                    },
                    {
                        label: 'intersection-observer',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const observeElements = (selector, callback, options = {}) => {\n\tconst defaultOptions = {\n\t\troot: null,\n\t\trootMargin: \'0px\',\n\t\tthreshold: 0.1,\n\t\t...options\n\t};\n\n\tconst observer = new IntersectionObserver((entries) => {\n\t\tentries.forEach(entry => {\n\t\t\tif (entry.isIntersecting) {\n\t\t\t\tcallback(entry.target, entry);\n\t\t\t}\n\t\t});\n\t}, defaultOptions);\n\n\tdocument.querySelectorAll(selector).forEach(el => {\n\t\tobserver.observe(el);\n\t});\n\n\treturn observer;\n};\n\n// Usage: observeElements(\'.fade-in\', (element) => element.classList.add(\'visible\'));',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Intersection Observer utility for scroll animations',
                        range: range
                    },
                    {
                        label: 'module-pattern',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const $1Module = (() => {\n\t// Private variables\n\tlet privateVar = $2;\n\n\t// Private methods\n\tconst privateMethod = () => {\n\t\t$3\n\t};\n\n\t// Public API\n\treturn {\n\t\tinit() {\n\t\t\t$4\n\t\t},\n\n\t\tpublicMethod() {\n\t\t\t$5\n\t\t},\n\n\t\tget data() {\n\t\t\treturn privateVar;\n\t\t}\n\t};\n})();\n\n// Usage: $1Module.init();',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Module pattern with private and public methods',
                        range: range
                    },
                    {
                        label: 'custom-event',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '// Create custom event\nconst $1Event = new CustomEvent(\'$1\', {\n\tdetail: {\n\t\t$2\n\t},\n\tbubbles: true,\n\tcancelable: true\n});\n\n// Dispatch event\ndocument.dispatchEvent($1Event);\n\n// Listen for event\ndocument.addEventListener(\'$1\', (event) => {\n\tconsole.log(\'Event data:\', event.detail);\n\t$3\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Custom event creation and handling',
                        range: range
                    },
                    // Complete HTML+CSS+JS Components
                    {
                        label: 'modal-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div id="myModal" class="modal">\n\t<div class="modal-content">\n\t\t<span class="close">&times;</span>\n\t\t<h2>$1</h2>\n\t\t<p>$2</p>\n\t\t<button id="confirmBtn" class="btn btn-primary">Confirm</button>\n\t</div>\n</div>\n<button id="openModal" class="btn">Open Modal</button>\n\n<style>\n.modal {\n\tdisplay: none;\n\tposition: fixed;\n\tz-index: 1000;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0,0,0,0.5);\n\tanimation: fadeIn 0.3s ease;\n}\n\n.modal-content {\n\tbackground-color: white;\n\tmargin: 15% auto;\n\tpadding: 20px;\n\tborder-radius: 0px;\n\twidth: 80%;\n\tmax-width: 500px;\n\tbox-shadow: 0 4px 20px rgba(0,0,0,0.3);\n\tanimation: slideIn 0.3s ease;\n}\n\n.close {\n\tcolor: #aaa;\n\tfloat: right;\n\tfont-size: 28px;\n\tfont-weight: bold;\n\tcursor: pointer;\n}\n\n.close:hover { color: #000; }\n\n@keyframes fadeIn {\n\tfrom { opacity: 0; }\n\tto { opacity: 1; }\n}\n\n@keyframes slideIn {\n\tfrom { transform: translateY(-50px); opacity: 0; }\n\tto { transform: translateY(0); opacity: 1; }\n}\n</style>\n\n<script>\nconst modal = document.getElementById(\'myModal\');\nconst openBtn = document.getElementById(\'openModal\');\nconst closeBtn = document.querySelector(\'.close\');\nconst confirmBtn = document.getElementById(\'confirmBtn\');\n\nopenBtn.onclick = () => modal.style.display = \'block\';\ncloseBtn.onclick = () => modal.style.display = \'none\';\nconfirmBtn.onclick = () => {\n\talert(\'Confirmed!\');\n\tmodal.style.display = \'none\';\n};\n\nwindow.onclick = (event) => {\n\tif (event.target === modal) {\n\t\tmodal.style.display = \'none\';\n\t}\n};\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete modal with HTML, CSS animations and JavaScript functionality',
                        range: range
                    },
                    {
                        label: 'dropdown-menu-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div class="dropdown">\n\t<button class="dropdown-toggle" id="dropdownBtn">$1 <span class="arrow">▼</span></button>\n\t<div class="dropdown-menu" id="dropdownMenu">\n\t\t<a href="#" class="dropdown-item">$2</a>\n\t\t<a href="#" class="dropdown-item">$3</a>\n\t\t<a href="#" class="dropdown-item">$4</a>\n\t</div>\n</div>\n\n<style>\n.dropdown {\n\tposition: relative;\n\tdisplay: inline-block;\n}\n\n.dropdown-toggle {\n\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\tcolor: white;\n\tborder: none;\n\tpadding: 12px 20px;\n\tborder-radius: 6px;\n\tcursor: pointer;\n\tfont-size: 16px;\n\ttransition: all 0.3s ease;\n}\n\n.dropdown-toggle:hover {\n\ttransform: translateY(-2px);\n\tbox-shadow: 0 5px 15px rgba(0,0,0,0.2);\n}\n\n.arrow {\n\ttransition: transform 0.3s ease;\n\tmargin-left: 8px;\n}\n\n.dropdown.open .arrow {\n\ttransform: rotate(180deg);\n}\n\n.dropdown-menu {\n\tposition: absolute;\n\ttop: 100%;\n\tleft: 0;\n\tbackground: white;\n\tmin-width: 200px;\n\tborder-radius: 6px;\n\tbox-shadow: 0 10px 25px rgba(0,0,0,0.15);\n\topacity: 0;\n\tvisibility: hidden;\n\ttransform: translateY(-10px);\n\ttransition: all 0.3s ease;\n\tz-index: 1000;\n}\n\n.dropdown.open .dropdown-menu {\n\topacity: 1;\n\tvisibility: visible;\n\ttransform: translateY(0);\n}\n\n.dropdown-item {\n\tdisplay: block;\n\tpadding: 12px 16px;\n\tcolor: #333;\n\ttext-decoration: none;\n\ttransition: background 0.2s ease;\n}\n\n.dropdown-item:hover {\n\tbackground: #f8f9fa;\n\tcolor: #667eea;\n}\n</style>\n\n<script>\nconst dropdown = document.querySelector(\'.dropdown\');\nconst dropdownBtn = document.getElementById(\'dropdownBtn\');\nconst dropdownMenu = document.getElementById(\'dropdownMenu\');\n\ndropdownBtn.addEventListener(\'click\', (e) => {\n\te.stopPropagation();\n\tdropdown.classList.toggle(\'open\');\n});\n\ndocument.addEventListener(\'click\', () => {\n\tdropdown.classList.remove(\'open\');\n});\n\ndropdownMenu.addEventListener(\'click\', (e) => {\n\te.stopPropagation();\n});\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete dropdown menu with animations and click outside to close',
                        range: range
                    },
                    {
                        label: 'tabs-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div class="tabs-container">\n\t<div class="tabs-nav">\n\t\t<button class="tab-btn active" data-tab="tab1">$1</button>\n\t\t<button class="tab-btn" data-tab="tab2">$2</button>\n\t\t<button class="tab-btn" data-tab="tab3">$3</button>\n\t</div>\n\t<div class="tabs-content">\n\t\t<div class="tab-pane active" id="tab1">\n\t\t\t<h3>$1 Content</h3>\n\t\t\t<p>$4</p>\n\t\t</div>\n\t\t<div class="tab-pane" id="tab2">\n\t\t\t<h3>$2 Content</h3>\n\t\t\t<p>$5</p>\n\t\t</div>\n\t\t<div class="tab-pane" id="tab3">\n\t\t\t<h3>$3 Content</h3>\n\t\t\t<p>$6</p>\n\t\t</div>\n\t</div>\n</div>\n\n<style>\n.tabs-container {\n\tmax-width: 600px;\n\tmargin: 20px auto;\n}\n\n.tabs-nav {\n\tdisplay: flex;\n\tborder-bottom: 2px solid #e1e5e9;\n\tmargin-bottom: 20px;\n}\n\n.tab-btn {\n\tbackground: none;\n\tborder: none;\n\tpadding: 15px 25px;\n\tcursor: pointer;\n\tfont-size: 16px;\n\tcolor: #6c757d;\n\ttransition: all 0.3s ease;\n\tposition: relative;\n}\n\n.tab-btn:hover {\n\tcolor: #667eea;\n\tbackground: rgba(102, 126, 234, 0.1);\n}\n\n.tab-btn.active {\n\tcolor: #667eea;\n\tfont-weight: 600;\n}\n\n.tab-btn.active::after {\n\tcontent: \'\';\n\tposition: absolute;\n\tbottom: -2px;\n\tleft: 0;\n\tright: 0;\n\theight: 2px;\n\tbackground: #667eea;\n\tanimation: slideIn 0.3s ease;\n}\n\n.tabs-content {\n\tposition: relative;\n}\n\n.tab-pane {\n\tdisplay: none;\n\tanimation: fadeIn 0.3s ease;\n}\n\n.tab-pane.active {\n\tdisplay: block;\n}\n\n@keyframes fadeIn {\n\tfrom { opacity: 0; transform: translateY(10px); }\n\tto { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes slideIn {\n\tfrom { transform: scaleX(0); }\n\tto { transform: scaleX(1); }\n}\n</style>\n\n<script>\nconst tabBtns = document.querySelectorAll(\'.tab-btn\');\nconst tabPanes = document.querySelectorAll(\'.tab-pane\');\n\ntabBtns.forEach(btn => {\n\tbtn.addEventListener(\'click\', () => {\n\t\tconst targetTab = btn.dataset.tab;\n\t\t\n\t\t// Remove active class from all buttons and panes\n\t\ttabBtns.forEach(b => b.classList.remove(\'active\'));\n\t\ttabPanes.forEach(p => p.classList.remove(\'active\'));\n\t\t\n\t\t// Add active class to clicked button and corresponding pane\n\t\tbtn.classList.add(\'active\');\n\t\tdocument.getElementById(targetTab).classList.add(\'active\');\n\t});\n});\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete tabs component with smooth animations and active states',
                        range: range
                    },
                    {
                        label: 'accordion-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div class="accordion">\n\t<div class="accordion-item">\n\t\t<div class="accordion-header">\n\t\t\t<h3>$1</h3>\n\t\t\t<span class="accordion-icon">+</span>\n\t\t</div>\n\t\t<div class="accordion-content">\n\t\t\t<p>$2</p>\n\t\t</div>\n\t</div>\n\t<div class="accordion-item">\n\t\t<div class="accordion-header">\n\t\t\t<h3>$3</h3>\n\t\t\t<span class="accordion-icon">+</span>\n\t\t</div>\n\t\t<div class="accordion-content">\n\t\t\t<p>$4</p>\n\t\t</div>\n\t</div>\n\t<div class="accordion-item">\n\t\t<div class="accordion-header">\n\t\t\t<h3>$5</h3>\n\t\t\t<span class="accordion-icon">+</span>\n\t\t</div>\n\t\t<div class="accordion-content">\n\t\t\t<p>$6</p>\n\t\t</div>\n\t</div>\n</div>\n\n<style>\n.accordion {\n\tmax-width: 600px;\n\tmargin: 20px auto;\n\tborder-radius: 10px;\n\toverflow: hidden;\n\tbox-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}\n\n.accordion-item {\n\tborder-bottom: 1px solid #e1e5e9;\n}\n\n.accordion-item:last-child {\n\tborder-bottom: none;\n}\n\n.accordion-header {\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\tpadding: 20px;\n\tbackground: white;\n\tcursor: pointer;\n\ttransition: background 0.3s ease;\n}\n\n.accordion-header:hover {\n\tbackground: #f8f9fa;\n}\n\n.accordion-header h3 {\n\tmargin: 0;\n\tcolor: #333;\n\tfont-size: 18px;\n}\n\n.accordion-icon {\n\tfont-size: 24px;\n\tcolor: #667eea;\n\ttransition: transform 0.3s ease;\n\tfont-weight: bold;\n}\n\n.accordion-item.active .accordion-icon {\n\ttransform: rotate(45deg);\n}\n\n.accordion-content {\n\tmax-height: 0;\n\toverflow: hidden;\n\tbackground: #f8f9fa;\n\ttransition: max-height 0.3s ease, padding 0.3s ease;\n}\n\n.accordion-item.active .accordion-content {\n\tmax-height: 200px;\n\tpadding: 20px;\n}\n\n.accordion-content p {\n\tmargin: 0;\n\tcolor: #6c757d;\n\tline-height: 1.6;\n}\n</style>\n\n<script>\nconst accordionHeaders = document.querySelectorAll(\'.accordion-header\');\n\naccordionHeaders.forEach(header => {\n\theader.addEventListener(\'click\', () => {\n\t\tconst accordionItem = header.parentElement;\n\t\tconst isActive = accordionItem.classList.contains(\'active\');\n\t\t\n\t\t// Close all accordion items\n\t\tdocument.querySelectorAll(\'.accordion-item\').forEach(item => {\n\t\t\titem.classList.remove(\'active\');\n\t\t});\n\t\t\n\t\t// Open clicked item if it wasn\'t active\n\t\tif (!isActive) {\n\t\t\taccordionItem.classList.add(\'active\');\n\t\t}\n\t});\n});\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete accordion component with smooth expand/collapse animations',
                        range: range
                    },
                    {
                        label: 'carousel-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div class="carousel">\n\t<div class="carousel-container">\n\t\t<div class="carousel-slide active">\n\t\t\t<img src="$1" alt="Slide 1">\n\t\t\t<div class="carousel-caption">\n\t\t\t\t<h3>$2</h3>\n\t\t\t\t<p>$3</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="carousel-slide">\n\t\t\t<img src="$4" alt="Slide 2">\n\t\t\t<div class="carousel-caption">\n\t\t\t\t<h3>$5</h3>\n\t\t\t\t<p>$6</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="carousel-slide">\n\t\t\t<img src="$7" alt="Slide 3">\n\t\t\t<div class="carousel-caption">\n\t\t\t\t<h3>$8</h3>\n\t\t\t\t<p>$9</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<button class="carousel-btn prev" id="prevBtn">‹</button>\n\t<button class="carousel-btn next" id="nextBtn">›</button>\n\t<div class="carousel-indicators">\n\t\t<span class="indicator active" data-slide="0"></span>\n\t\t<span class="indicator" data-slide="1"></span>\n\t\t<span class="indicator" data-slide="2"></span>\n\t</div>\n</div>\n\n<style>\n.carousel {\n\tposition: relative;\n\tmax-width: 800px;\n\tmargin: 20px auto;\n\tborder-radius: 10px;\n\toverflow: hidden;\n\tbox-shadow: 0 10px 30px rgba(0,0,0,0.3);\n}\n\n.carousel-container {\n\tposition: relative;\n\theight: 400px;\n}\n\n.carousel-slide {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\topacity: 0;\n\ttransition: opacity 0.5s ease-in-out;\n}\n\n.carousel-slide.active {\n\topacity: 1;\n}\n\n.carousel-slide img {\n\twidth: 100%;\n\theight: 100%;\n\tobject-fit: cover;\n}\n\n.carousel-caption {\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tbackground: linear-gradient(transparent, rgba(0,0,0,0.7));\n\tcolor: white;\n\tpadding: 40px 20px 20px;\n\ttransform: translateY(20px);\n\topacity: 0;\n\ttransition: all 0.5s ease;\n}\n\n.carousel-slide.active .carousel-caption {\n\ttransform: translateY(0);\n\topacity: 1;\n}\n\n.carousel-btn {\n\tposition: absolute;\n\ttop: 50%;\n\ttransform: translateY(-50%);\n\tbackground: rgba(255,255,255,0.8);\n\tborder: none;\n\twidth: 50px;\n\theight: 50px;\n\tborder-radius: 50%;\n\tfont-size: 24px;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\tz-index: 10;\n}\n\n.carousel-btn:hover {\n\tbackground: white;\n\ttransform: translateY(-50%) scale(1.1);\n}\n\n.prev { left: 20px; }\n.next { right: 20px; }\n\n.carousel-indicators {\n\tposition: absolute;\n\tbottom: 20px;\n\tleft: 50%;\n\ttransform: translateX(-50%);\n\tdisplay: flex;\n\tgap: 10px;\n}\n\n.indicator {\n\twidth: 12px;\n\theight: 12px;\n\tborder-radius: 50%;\n\tbackground: rgba(255,255,255,0.5);\n\tcursor: pointer;\n\ttransition: background 0.3s ease;\n}\n\n.indicator.active {\n\tbackground: white;\n}\n</style>\n\n<script>\nclass Carousel {\n\tconstructor() {\n\t\tthis.currentSlide = 0;\n\t\tthis.slides = document.querySelectorAll(\'.carousel-slide\');\n\t\tthis.indicators = document.querySelectorAll(\'.indicator\');\n\t\tthis.prevBtn = document.getElementById(\'prevBtn\');\n\t\tthis.nextBtn = document.getElementById(\'nextBtn\');\n\t\t\n\t\tthis.init();\n\t}\n\t\n\tinit() {\n\t\tthis.prevBtn.addEventListener(\'click\', () => this.prevSlide());\n\t\tthis.nextBtn.addEventListener(\'click\', () => this.nextSlide());\n\t\t\n\t\tthis.indicators.forEach((indicator, index) => {\n\t\t\tindicator.addEventListener(\'click\', () => this.goToSlide(index));\n\t\t});\n\t\t\n\t\t// Auto-play\n\t\tsetInterval(() => this.nextSlide(), 5000);\n\t}\n\t\n\tgoToSlide(slideIndex) {\n\t\tthis.slides[this.currentSlide].classList.remove(\'active\');\n\t\tthis.indicators[this.currentSlide].classList.remove(\'active\');\n\t\t\n\t\tthis.currentSlide = slideIndex;\n\t\t\n\t\tthis.slides[this.currentSlide].classList.add(\'active\');\n\t\tthis.indicators[this.currentSlide].classList.add(\'active\');\n\t}\n\t\n\tnextSlide() {\n\t\tconst nextIndex = (this.currentSlide + 1) % this.slides.length;\n\t\tthis.goToSlide(nextIndex);\n\t}\n\t\n\tprevSlide() {\n\t\tconst prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;\n\t\tthis.goToSlide(prevIndex);\n\t}\n}\n\nnew Carousel();\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete image carousel with navigation, indicators, captions and auto-play',
                        range: range
                    },
                    // Advanced Interactive Components
                    {
                        label: 'search-filter-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div class="search-container">\n\t<input type="text" id="searchInput" placeholder="Search items..." class="search-input">\n\t<div class="filter-buttons">\n\t\t<button class="filter-btn active" data-filter="all">All</button>\n\t\t<button class="filter-btn" data-filter="$1">$1</button>\n\t\t<button class="filter-btn" data-filter="$2">$2</button>\n\t\t<button class="filter-btn" data-filter="$3">$3</button>\n\t</div>\n\t<div class="results-count">Showing <span id="resultCount">0</span> items</div>\n</div>\n\n<div class="items-grid" id="itemsGrid">\n\t<div class="item" data-category="$1" data-name="$4">\n\t\t<img src="$5" alt="$4">\n\t\t<h3>$4</h3>\n\t\t<p class="category">$1</p>\n\t</div>\n\t<div class="item" data-category="$2" data-name="$6">\n\t\t<img src="$7" alt="$6">\n\t\t<h3>$6</h3>\n\t\t<p class="category">$2</p>\n\t</div>\n\t<div class="item" data-category="$3" data-name="$8">\n\t\t<img src="$9" alt="$8">\n\t\t<h3>$8</h3>\n\t\t<p class="category">$3</p>\n\t</div>\n</div>\n\n<style>\n.search-container {\n\tmax-width: 800px;\n\tmargin: 20px auto;\n\tpadding: 20px;\n\tbackground: white;\n\tborder-radius: 10px;\n\tbox-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}\n\n.search-input {\n\twidth: 100%;\n\tpadding: 15px;\n\tborder: 2px solid #e1e5e9;\n\tborder-radius: 8px;\n\tfont-size: 16px;\n\ttransition: border-color 0.3s ease;\n\tmargin-bottom: 20px;\n}\n\n.search-input:focus {\n\tborder-color: #667eea;\n\toutline: none;\n}\n\n.filter-buttons {\n\tdisplay: flex;\n\tgap: 10px;\n\tmargin-bottom: 15px;\n\tflex-wrap: wrap;\n}\n\n.filter-btn {\n\tpadding: 10px 20px;\n\tborder: 2px solid #e1e5e9;\n\tbackground: white;\n\tborder-radius: 25px;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\tfont-size: 14px;\n}\n\n.filter-btn:hover {\n\tborder-color: #667eea;\n\tcolor: #667eea;\n}\n\n.filter-btn.active {\n\tbackground: #667eea;\n\tcolor: white;\n\tborder-color: #667eea;\n}\n\n.results-count {\n\tcolor: #6c757d;\n\tfont-size: 14px;\n}\n\n.items-grid {\n\tdisplay: grid;\n\tgrid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n\tgap: 20px;\n\tmax-width: 800px;\n\tmargin: 20px auto;\n\tpadding: 0 20px;\n}\n\n.item {\n\tbackground: white;\n\tborder-radius: 10px;\n\toverflow: hidden;\n\tbox-shadow: 0 2px 10px rgba(0,0,0,0.1);\n\ttransition: all 0.3s ease;\n\topacity: 1;\n\ttransform: scale(1);\n}\n\n.item:hover {\n\ttransform: translateY(-5px);\n\tbox-shadow: 0 5px 20px rgba(0,0,0,0.15);\n}\n\n.item.hidden {\n\topacity: 0;\n\ttransform: scale(0.8);\n\tpointer-events: none;\n}\n\n.item img {\n\twidth: 100%;\n\theight: 200px;\n\tobject-fit: cover;\n}\n\n.item h3 {\n\tpadding: 15px 15px 5px;\n\tmargin: 0;\n\tcolor: #333;\n}\n\n.item .category {\n\tpadding: 0 15px 15px;\n\tmargin: 0;\n\tcolor: #667eea;\n\tfont-size: 14px;\n\tfont-weight: 600;\n\ttext-transform: uppercase;\n}\n</style>\n\n<script>\nclass SearchFilter {\n\tconstructor() {\n\t\tthis.searchInput = document.getElementById(\'searchInput\');\n\t\tthis.filterBtns = document.querySelectorAll(\'.filter-btn\');\n\t\tthis.items = document.querySelectorAll(\'.item\');\n\t\tthis.resultCount = document.getElementById(\'resultCount\');\n\t\tthis.currentFilter = \'all\';\n\t\t\n\t\tthis.init();\n\t}\n\t\n\tinit() {\n\t\tthis.searchInput.addEventListener(\'input\', () => this.handleSearch());\n\t\t\n\t\tthis.filterBtns.forEach(btn => {\n\t\t\tbtn.addEventListener(\'click\', () => this.handleFilter(btn));\n\t\t});\n\t\t\n\t\tthis.updateResultCount();\n\t}\n\t\n\thandleSearch() {\n\t\tconst searchTerm = this.searchInput.value.toLowerCase();\n\t\t\n\t\tthis.items.forEach(item => {\n\t\t\tconst itemName = item.dataset.name.toLowerCase();\n\t\t\tconst itemCategory = item.dataset.category.toLowerCase();\n\t\t\tconst matchesSearch = itemName.includes(searchTerm) || itemCategory.includes(searchTerm);\n\t\t\tconst matchesFilter = this.currentFilter === \'all\' || item.dataset.category === this.currentFilter;\n\t\t\t\n\t\t\tif (matchesSearch && matchesFilter) {\n\t\t\t\titem.classList.remove(\'hidden\');\n\t\t\t} else {\n\t\t\t\titem.classList.add(\'hidden\');\n\t\t\t}\n\t\t});\n\t\t\n\t\tthis.updateResultCount();\n\t}\n\t\n\thandleFilter(clickedBtn) {\n\t\t// Update active button\n\t\tthis.filterBtns.forEach(btn => btn.classList.remove(\'active\'));\n\t\tclickedBtn.classList.add(\'active\');\n\t\t\n\t\tthis.currentFilter = clickedBtn.dataset.filter;\n\t\tthis.handleSearch(); // Re-run search with new filter\n\t}\n\t\n\tupdateResultCount() {\n\t\tconst visibleItems = document.querySelectorAll(\'.item:not(.hidden)\').length;\n\t\tthis.resultCount.textContent = visibleItems;\n\t}\n}\n\nnew SearchFilter();\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete search and filter system with live results and animations',
                        range: range
                    },
                    {
                        label: 'todo-app-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div class="todo-app">\n\t<div class="todo-header">\n\t\t<h1>$1 Todo App</h1>\n\t\t<div class="add-todo">\n\t\t\t<input type="text" id="todoInput" placeholder="Add a new task..." class="todo-input">\n\t\t\t<button id="addBtn" class="add-btn">Add</button>\n\t\t</div>\n\t</div>\n\t\n\t<div class="todo-filters">\n\t\t<button class="filter-btn active" data-filter="all">All (<span id="allCount">0</span>)</button>\n\t\t<button class="filter-btn" data-filter="active">Active (<span id="activeCount">0</span>)</button>\n\t\t<button class="filter-btn" data-filter="completed">Completed (<span id="completedCount">0</span>)</button>\n\t</div>\n\t\n\t<ul class="todo-list" id="todoList"></ul>\n\t\n\t<div class="todo-footer">\n\t\t<button id="clearCompleted" class="clear-btn">Clear Completed</button>\n\t</div>\n</div>\n\n<style>\n.todo-app {\n\tmax-width: 600px;\n\tmargin: 20px auto;\n\tbackground: white;\n\tborder-radius: 10px;\n\tbox-shadow: 0 4px 20px rgba(0,0,0,0.1);\n\toverflow: hidden;\n}\n\n.todo-header {\n\tpadding: 30px;\n\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\tcolor: white;\n}\n\n.todo-header h1 {\n\tmargin: 0 0 20px 0;\n\ttext-align: center;\n}\n\n.add-todo {\n\tdisplay: flex;\n\tgap: 10px;\n}\n\n.todo-input {\n\tflex: 1;\n\tpadding: 12px 15px;\n\tborder: none;\n\tborder-radius: 6px;\n\tfont-size: 16px;\n}\n\n.add-btn {\n\tpadding: 12px 20px;\n\tbackground: rgba(255,255,255,0.2);\n\tcolor: white;\n\tborder: 1px solid rgba(255,255,255,0.3);\n\tborder-radius: 6px;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n}\n\n.add-btn:hover {\n\tbackground: rgba(255,255,255,0.3);\n}\n\n.todo-filters {\n\tdisplay: flex;\n\tpadding: 20px;\n\tgap: 10px;\n\tborder-bottom: 1px solid #e1e5e9;\n}\n\n.filter-btn {\n\tpadding: 8px 15px;\n\tbackground: none;\n\tborder: 1px solid #e1e5e9;\n\tborder-radius: 20px;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\tfont-size: 14px;\n}\n\n.filter-btn:hover {\n\tborder-color: #667eea;\n\tcolor: #667eea;\n}\n\n.filter-btn.active {\n\tbackground: #667eea;\n\tcolor: white;\n\tborder-color: #667eea;\n}\n\n.todo-list {\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n\tmax-height: 400px;\n\toverflow-y: auto;\n}\n\n.todo-item {\n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 15px 20px;\n\tborder-bottom: 1px solid #f0f0f0;\n\ttransition: all 0.3s ease;\n\tanimation: slideIn 0.3s ease;\n}\n\n.todo-item:hover {\n\tbackground: #f8f9fa;\n}\n\n.todo-item.completed {\n\topacity: 0.6;\n}\n\n.todo-item.completed .todo-text {\n\ttext-decoration: line-through;\n\tcolor: #6c757d;\n}\n\n.todo-checkbox {\n\twidth: 20px;\n\theight: 20px;\n\tmargin-right: 15px;\n\tcursor: pointer;\n}\n\n.todo-text {\n\tflex: 1;\n\tfont-size: 16px;\n\tcolor: #333;\n}\n\n.todo-actions {\n\tdisplay: flex;\n\tgap: 10px;\n\topacity: 0;\n\ttransition: opacity 0.3s ease;\n}\n\n.todo-item:hover .todo-actions {\n\topacity: 1;\n}\n\n.edit-btn, .delete-btn {\n\tpadding: 5px 10px;\n\tborder: none;\n\tborder-radius: 4px;\n\tcursor: pointer;\n\tfont-size: 12px;\n\ttransition: all 0.3s ease;\n}\n\n.edit-btn {\n\tbackground: #ffc107;\n\tcolor: white;\n}\n\n.delete-btn {\n\tbackground: #dc3545;\n\tcolor: white;\n}\n\n.todo-footer {\n\tpadding: 20px;\n\ttext-align: center;\n\tborder-top: 1px solid #e1e5e9;\n}\n\n.clear-btn {\n\tpadding: 10px 20px;\n\tbackground: #dc3545;\n\tcolor: white;\n\tborder: none;\n\tborder-radius: 6px;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n}\n\n.clear-btn:hover {\n\tbackground: #c82333;\n}\n\n@keyframes slideIn {\n\tfrom { transform: translateX(-100%); opacity: 0; }\n\tto { transform: translateX(0); opacity: 1; }\n}\n</style>\n\n<script>\nclass TodoApp {\n\tconstructor() {\n\t\tthis.todos = JSON.parse(localStorage.getItem(\'todos\')) || [];\n\t\tthis.currentFilter = \'all\';\n\t\tthis.todoInput = document.getElementById(\'todoInput\');\n\t\tthis.addBtn = document.getElementById(\'addBtn\');\n\t\tthis.todoList = document.getElementById(\'todoList\');\n\t\tthis.filterBtns = document.querySelectorAll(\'.filter-btn\');\n\t\tthis.clearBtn = document.getElementById(\'clearCompleted\');\n\t\t\n\t\tthis.init();\n\t}\n\t\n\tinit() {\n\t\tthis.addBtn.addEventListener(\'click\', () => this.addTodo());\n\t\tthis.todoInput.addEventListener(\'keypress\', (e) => {\n\t\t\tif (e.key === \'Enter\') this.addTodo();\n\t\t});\n\t\t\n\t\tthis.filterBtns.forEach(btn => {\n\t\t\tbtn.addEventListener(\'click\', () => this.setFilter(btn.dataset.filter));\n\t\t});\n\t\t\n\t\tthis.clearBtn.addEventListener(\'click\', () => this.clearCompleted());\n\t\t\n\t\tthis.render();\n\t}\n\t\n\taddTodo() {\n\t\tconst text = this.todoInput.value.trim();\n\t\tif (!text) return;\n\t\t\n\t\tconst todo = {\n\t\t\tid: Date.now(),\n\t\t\ttext: text,\n\t\t\tcompleted: false\n\t\t};\n\t\t\n\t\tthis.todos.push(todo);\n\t\tthis.todoInput.value = \'\';\n\t\tthis.saveTodos();\n\t\tthis.render();\n\t}\n\t\n\ttoggleTodo(id) {\n\t\tthis.todos = this.todos.map(todo => \n\t\t\ttodo.id === id ? { ...todo, completed: !todo.completed } : todo\n\t\t);\n\t\tthis.saveTodos();\n\t\tthis.render();\n\t}\n\t\n\tdeleteTodo(id) {\n\t\tthis.todos = this.todos.filter(todo => todo.id !== id);\n\t\tthis.saveTodos();\n\t\tthis.render();\n\t}\n\t\n\tclearCompleted() {\n\t\tthis.todos = this.todos.filter(todo => !todo.completed);\n\t\tthis.saveTodos();\n\t\tthis.render();\n\t}\n\t\n\tsetFilter(filter) {\n\t\tthis.currentFilter = filter;\n\t\tthis.filterBtns.forEach(btn => {\n\t\t\tbtn.classList.toggle(\'active\', btn.dataset.filter === filter);\n\t\t});\n\t\tthis.render();\n\t}\n\t\n\tgetFilteredTodos() {\n\t\tswitch (this.currentFilter) {\n\t\t\tcase \'active\':\n\t\t\t\treturn this.todos.filter(todo => !todo.completed);\n\t\t\tcase \'completed\':\n\t\t\t\treturn this.todos.filter(todo => todo.completed);\n\t\t\tdefault:\n\t\t\t\treturn this.todos;\n\t\t}\n\t}\n\t\n\tupdateCounts() {\n\t\tconst all = this.todos.length;\n\t\tconst active = this.todos.filter(todo => !todo.completed).length;\n\t\tconst completed = this.todos.filter(todo => todo.completed).length;\n\t\t\n\t\tdocument.getElementById(\'allCount\').textContent = all;\n\t\tdocument.getElementById(\'activeCount\').textContent = active;\n\t\tdocument.getElementById(\'completedCount\').textContent = completed;\n\t}\n\t\n\trender() {\n\t\tconst filteredTodos = this.getFilteredTodos();\n\t\t\n\t\tthis.todoList.innerHTML = filteredTodos.map(todo => `\n\t\t\t<li class="todo-item ${todo.completed ? \'completed\' : \'\'}">\n\t\t\t\t<input type="checkbox" class="todo-checkbox" ${todo.completed ? \'checked\' : \'\'} \n\t\t\t\t\tonchange="todoApp.toggleTodo(${todo.id})">\n\t\t\t\t<span class="todo-text">${todo.text}</span>\n\t\t\t\t<div class="todo-actions">\n\t\t\t\t\t<button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})">Delete</button>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t`).join(\'\');\n\t\t\n\t\tthis.updateCounts();\n\t}\n\t\n\tsaveTodos() {\n\t\tlocalStorage.setItem(\'todos\', JSON.stringify(this.todos));\n\t}\n}\n\nconst todoApp = new TodoApp();\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete todo application with local storage, filters and animations',
                        range: range
                    },
                    {
                        label: 'contact-form-complete',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '<!-- HTML -->\n<div class="contact-form-container">\n\t<form class="contact-form" id="contactForm">\n\t\t<h2>$1</h2>\n\t\t<p class="form-description">$2</p>\n\t\t\n\t\t<div class="form-group">\n\t\t\t<label for="name">Name *</label>\n\t\t\t<input type="text" id="name" name="name" required>\n\t\t\t<span class="error-message" id="nameError"></span>\n\t\t</div>\n\t\t\n\t\t<div class="form-group">\n\t\t\t<label for="email">Email *</label>\n\t\t\t<input type="email" id="email" name="email" required>\n\t\t\t<span class="error-message" id="emailError"></span>\n\t\t</div>\n\t\t\n\t\t<div class="form-group">\n\t\t\t<label for="phone">Phone</label>\n\t\t\t<input type="tel" id="phone" name="phone">\n\t\t\t<span class="error-message" id="phoneError"></span>\n\t\t</div>\n\t\t\n\t\t<div class="form-group">\n\t\t\t<label for="subject">Subject *</label>\n\t\t\t<select id="subject" name="subject" required>\n\t\t\t\t<option value="">Select a subject</option>\n\t\t\t\t<option value="general">General Inquiry</option>\n\t\t\t\t<option value="support">Support</option>\n\t\t\t\t<option value="business">Business</option>\n\t\t\t</select>\n\t\t\t<span class="error-message" id="subjectError"></span>\n\t\t</div>\n\t\t\n\t\t<div class="form-group">\n\t\t\t<label for="message">Message *</label>\n\t\t\t<textarea id="message" name="message" rows="5" required></textarea>\n\t\t\t<span class="error-message" id="messageError"></span>\n\t\t</div>\n\t\t\n\t\t<div class="form-group checkbox-group">\n\t\t\t<label class="checkbox-label">\n\t\t\t\t<input type="checkbox" id="privacy" name="privacy" required>\n\t\t\t\t<span class="checkmark"></span>\n\t\t\t\tI agree to the privacy policy *\n\t\t\t</label>\n\t\t\t<span class="error-message" id="privacyError"></span>\n\t\t</div>\n\t\t\n\t\t<button type="submit" class="submit-btn" id="submitBtn">\n\t\t\t<span class="btn-text">Send Message</span>\n\t\t\t<span class="btn-loader"></span>\n\t\t</button>\n\t</form>\n\t\n\t<div class="success-message" id="successMessage">\n\t\t<div class="success-icon">✓</div>\n\t\t<h3>Message Sent Successfully!</h3>\n\t\t<p>Thank you for contacting us. We\'ll get back to you soon.</p>\n\t\t<button class="new-message-btn" id="newMessageBtn">Send Another Message</button>\n\t</div>\n</div>\n\n<style>\n.contact-form-container {\n\tmax-width: 600px;\n\tmargin: 20px auto;\n\tpadding: 20px;\n\tposition: relative;\n}\n\n.contact-form {\n\tbackground: white;\n\tpadding: 40px;\n\tborder-radius: 10px;\n\tbox-shadow: 0 4px 20px rgba(0,0,0,0.1);\n\ttransition: all 0.3s ease;\n}\n\n.contact-form.hidden {\n\topacity: 0;\n\ttransform: translateY(-20px);\n\tpointer-events: none;\n}\n\n.contact-form h2 {\n\tmargin: 0 0 10px 0;\n\tcolor: #333;\n\ttext-align: center;\n}\n\n.form-description {\n\ttext-align: center;\n\tcolor: #6c757d;\n\tmargin-bottom: 30px;\n}\n\n.form-group {\n\tmargin-bottom: 25px;\n}\n\n.form-group label {\n\tdisplay: block;\n\tmargin-bottom: 8px;\n\tcolor: #333;\n\tfont-weight: 600;\n}\n\n.form-group input,\n.form-group select,\n.form-group textarea {\n\twidth: 100%;\n\tpadding: 12px 15px;\n\tborder: 2px solid #e1e5e9;\n\tborder-radius: 6px;\n\tfont-size: 16px;\n\ttransition: all 0.3s ease;\n\tbox-sizing: border-box;\n}\n\n.form-group input:focus,\n.form-group select:focus,\n.form-group textarea:focus {\n\tborder-color: #667eea;\n\toutline: none;\n\tbox-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n\n.form-group.error input,\n.form-group.error select,\n.form-group.error textarea {\n\tborder-color: #dc3545;\n}\n\n.error-message {\n\tcolor: #dc3545;\n\tfont-size: 14px;\n\tmargin-top: 5px;\n\tdisplay: block;\n\tmin-height: 20px;\n}\n\n.checkbox-group {\n\tposition: relative;\n}\n\n.checkbox-label {\n\tdisplay: flex;\n\talign-items: center;\n\tcursor: pointer;\n\tfont-weight: normal !important;\n}\n\n.checkbox-label input[type="checkbox"] {\n\topacity: 0;\n\tposition: absolute;\n\twidth: 0;\n\theight: 0;\n}\n\n.checkmark {\n\twidth: 20px;\n\theight: 20px;\n\tborder: 2px solid #e1e5e9;\n\tborder-radius: 4px;\n\tmargin-right: 10px;\n\tposition: relative;\n\ttransition: all 0.3s ease;\n\tflex-shrink: 0;\n}\n\n.checkbox-label input:checked + .checkmark {\n\tbackground: #667eea;\n\tborder-color: #667eea;\n}\n\n.checkbox-label input:checked + .checkmark::after {\n\tcontent: \'\';\n\tposition: absolute;\n\tleft: 6px;\n\ttop: 2px;\n\twidth: 6px;\n\theight: 10px;\n\tborder: solid white;\n\tborder-width: 0 2px 2px 0;\n\ttransform: rotate(45deg);\n}\n\n.submit-btn {\n\twidth: 100%;\n\tpadding: 15px;\n\tbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n\tcolor: white;\n\tborder: none;\n\tborder-radius: 6px;\n\tfont-size: 16px;\n\tfont-weight: 600;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n\tposition: relative;\n\toverflow: hidden;\n}\n\n.submit-btn:hover {\n\ttransform: translateY(-2px);\n\tbox-shadow: 0 5px 15px rgba(0,0,0,0.2);\n}\n\n.submit-btn:disabled {\n\topacity: 0.7;\n\tcursor: not-allowed;\n\ttransform: none;\n}\n\n.btn-loader {\n\tdisplay: none;\n\twidth: 20px;\n\theight: 20px;\n\tborder: 2px solid transparent;\n\tborder-top: 2px solid white;\n\tborder-radius: 50%;\n\tanimation: spin 1s linear infinite;\n\tmargin-left: 10px;\n}\n\n.submit-btn.loading .btn-text {\n\topacity: 0.7;\n}\n\n.submit-btn.loading .btn-loader {\n\tdisplay: inline-block;\n}\n\n.success-message {\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\tbackground: white;\n\tpadding: 40px;\n\tborder-radius: 10px;\n\tbox-shadow: 0 4px 20px rgba(0,0,0,0.1);\n\ttext-align: center;\n\topacity: 0;\n\tvisibility: hidden;\n\ttransition: all 0.3s ease;\n\twidth: 90%;\n\tmax-width: 400px;\n}\n\n.success-message.show {\n\topacity: 1;\n\tvisibility: visible;\n}\n\n.success-icon {\n\twidth: 60px;\n\theight: 60px;\n\tbackground: #28a745;\n\tcolor: white;\n\tborder-radius: 50%;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tfont-size: 30px;\n\tmargin: 0 auto 20px;\n\tanimation: bounce 0.6s ease;\n}\n\n.success-message h3 {\n\tcolor: #333;\n\tmargin-bottom: 10px;\n}\n\n.success-message p {\n\tcolor: #6c757d;\n\tmargin-bottom: 25px;\n}\n\n.new-message-btn {\n\tpadding: 10px 20px;\n\tbackground: #667eea;\n\tcolor: white;\n\tborder: none;\n\tborder-radius: 6px;\n\tcursor: pointer;\n\ttransition: all 0.3s ease;\n}\n\n.new-message-btn:hover {\n\tbackground: #5a67d8;\n}\n\n@keyframes spin {\n\t0% { transform: rotate(0deg); }\n\t100% { transform: rotate(360deg); }\n}\n\n@keyframes bounce {\n\t0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n\t40% { transform: translateY(-10px); }\n\t60% { transform: translateY(-5px); }\n}\n</style>\n\n<script>\nclass ContactForm {\n\tconstructor() {\n\t\tthis.form = document.getElementById(\'contactForm\');\n\t\tthis.submitBtn = document.getElementById(\'submitBtn\');\n\t\tthis.successMessage = document.getElementById(\'successMessage\');\n\t\tthis.newMessageBtn = document.getElementById(\'newMessageBtn\');\n\t\t\n\t\tthis.validationRules = {\n\t\t\tname: { required: true, minLength: 2 },\n\t\t\temail: { required: true, pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ },\n\t\t\tphone: { pattern: /^[\\+]?[0-9\\s\\-\\(\\)]{10,}$/ },\n\t\t\tsubject: { required: true },\n\t\t\tmessage: { required: true, minLength: 10 },\n\t\t\tprivacy: { required: true }\n\t\t};\n\t\t\n\t\tthis.init();\n\t}\n\t\n\tinit() {\n\t\tthis.form.addEventListener(\'submit\', (e) => this.handleSubmit(e));\n\t\tthis.newMessageBtn.addEventListener(\'click\', () => this.resetForm());\n\t\t\n\t\t// Real-time validation\n\t\tObject.keys(this.validationRules).forEach(fieldName => {\n\t\t\tconst field = document.getElementById(fieldName);\n\t\t\tif (field) {\n\t\t\t\tfield.addEventListener(\'blur\', () => this.validateField(fieldName));\n\t\t\t\tfield.addEventListener(\'input\', () => this.clearError(fieldName));\n\t\t\t}\n\t\t});\n\t}\n\t\n\tvalidateField(fieldName) {\n\t\tconst field = document.getElementById(fieldName);\n\t\tconst rules = this.validationRules[fieldName];\n\t\tconst value = field.type === \'checkbox\' ? field.checked : field.value.trim();\n\t\t\n\t\tlet isValid = true;\n\t\tlet errorMessage = \'\';\n\t\t\n\t\tif (rules.required && (!value || value === \'\')) {\n\t\t\tisValid = false;\n\t\t\terrorMessage = \'This field is required\';\n\t\t} else if (rules.minLength && value.length < rules.minLength) {\n\t\t\tisValid = false;\n\t\t\terrorMessage = `Minimum ${rules.minLength} characters required`;\n\t\t} else if (rules.pattern && !rules.pattern.test(value)) {\n\t\t\tisValid = false;\n\t\t\terrorMessage = fieldName === \'email\' ? \'Please enter a valid email\' : \'Invalid format\';\n\t\t}\n\t\t\n\t\tthis.showError(fieldName, isValid ? \'\' : errorMessage);\n\t\treturn isValid;\n\t}\n\t\n\tshowError(fieldName, message) {\n\t\tconst field = document.getElementById(fieldName);\n\t\tconst errorElement = document.getElementById(fieldName + \'Error\');\n\t\tconst formGroup = field.closest(\'.form-group\');\n\t\t\n\t\terrorElement.textContent = message;\n\t\tformGroup.classList.toggle(\'error\', !!message);\n\t}\n\t\n\tclearError(fieldName) {\n\t\tconst field = document.getElementById(fieldName);\n\t\tconst formGroup = field.closest(\'.form-group\');\n\t\tif (formGroup.classList.contains(\'error\')) {\n\t\t\tthis.showError(fieldName, \'\');\n\t\t}\n\t}\n\t\n\tvalidateForm() {\n\t\tlet isValid = true;\n\t\tObject.keys(this.validationRules).forEach(fieldName => {\n\t\t\tif (!this.validateField(fieldName)) {\n\t\t\t\tisValid = false;\n\t\t\t}\n\t\t});\n\t\treturn isValid;\n\t}\n\t\n\tasync handleSubmit(e) {\n\t\te.preventDefault();\n\t\t\n\t\tif (!this.validateForm()) {\n\t\t\treturn;\n\t\t}\n\t\t\n\t\tthis.setLoading(true);\n\t\t\n\t\ttry {\n\t\t\t// Simulate API call\n\t\t\tawait new Promise(resolve => setTimeout(resolve, 2000));\n\t\t\t\n\t\t\t// Show success message\n\t\t\tthis.showSuccess();\n\t\t\t\n\t\t} catch (error) {\n\t\t\talert(\'Error sending message. Please try again.\');\n\t\t} finally {\n\t\t\tthis.setLoading(false);\n\t\t}\n\t}\n\t\n\tsetLoading(loading) {\n\t\tthis.submitBtn.disabled = loading;\n\t\tthis.submitBtn.classList.toggle(\'loading\', loading);\n\t}\n\t\n\tshowSuccess() {\n\t\tthis.form.classList.add(\'hidden\');\n\t\tthis.successMessage.classList.add(\'show\');\n\t}\n\t\n\tresetForm() {\n\t\tthis.form.reset();\n\t\tthis.form.classList.remove(\'hidden\');\n\t\tthis.successMessage.classList.remove(\'show\');\n\t\t\n\t\t// Clear all errors\n\t\tObject.keys(this.validationRules).forEach(fieldName => {\n\t\t\tthis.showError(fieldName, \'\');\n\t\t});\n\t}\n}\n\nnew ContactForm();\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete contact form with validation, loading states and success animation',
                        range: range
                    }
                ];

                return { suggestions: suggestions };
            }
        });
    }

    // Register all suggestion providers
    registerHTMLSuggestions();
    registerCSSSuggestions();
    registerJavaScriptSuggestions();

    console.log('🧠 Enhanced IntelliSense suggestions registered');
}

// Monaco Editor Utilities
function getEditorStats() {
    if (!editor) return null;

    const model = editor.getModel();
    const text = model.getValue();
    const lines = text.split('\n');

    return {
        totalLines: lines.length,
        totalCharacters: text.length,
        totalWords: text.split(/\s+/).filter(word => word.length > 0).length,
        currentLine: editor.getPosition().lineNumber,
        currentColumn: editor.getPosition().column,
        selectedText: editor.getModel().getValueInRange(editor.getSelection()),
        language: model.getLanguageId()
    };
}

function showEditorStats() {
    const stats = getEditorStats();
    if (!stats) return;

    showEditorStatsModal(stats);
}

function showEditorStatsModal(stats) {
    // Create beautiful stats modal
    const modalHTML = `
        <div class="editor-stats-modal-overlay" id="editorStatsModal">
            <div class="editor-stats-modal-content">
                <div class="editor-stats-header">
                    <div class="stats-icon">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                    <h2> Editor Statistics</h2>
                    <button class="stats-close-btn" onclick="closeEditorStatsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="editor-stats-grid">
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-align-left"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.totalLines.toLocaleString()}</div>
                            <div class="stat-label">Lines</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-font"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.totalCharacters.toLocaleString()}</div>
                            <div class="stat-label">Characters</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-spell-check"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.totalWords.toLocaleString()}</div>
                            <div class="stat-label">Words</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">Line ${stats.currentLine}, Col ${stats.currentColumn}</div>
                            <div class="stat-label">Current Position</div>
                        </div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.language.toUpperCase()}</div>
                            <div class="stat-label">Language</div>
                        </div>
                    </div>
                    
                    ${stats.selectedText ? `
                    <div class="stat-item selected">
                        <div class="stat-icon">
                            <i class="fas fa-highlighter"></i>
                        </div>
                        <div class="stat-info">
                            <div class="stat-value">${stats.selectedText.length.toLocaleString()}</div>
                            <div class="stat-label">Selected Characters</div>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="editor-stats-footer">
                    <button class="stats-refresh-btn" onclick="refreshEditorStats()">
                        <i class="fas fa-sync-alt"></i>
                        Refresh
                    </button>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('editorStatsModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Close on overlay click
    document.getElementById('editorStatsModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('editor-stats-modal-overlay')) {
            closeEditorStatsModal();
        }
    });
}

function closeEditorStatsModal() {
    const modal = document.getElementById('editorStatsModal');
    if (modal) {
        modal.remove();
    }
}

function refreshEditorStats() {
    const stats = getEditorStats();
    if (stats) {
        closeEditorStatsModal();
        setTimeout(() => showEditorStatsModal(stats), 100);
    }
}

// Export advanced functions globally
window.addCustomMonacoActions = addCustomMonacoActions;
window.configureAdvancedMonacoFeatures = configureAdvancedMonacoFeatures;
window.addEditorDecorations = addEditorDecorations;
window.enhancedFindReplace = enhancedFindReplace;
window.setupEnhancedIntelliSense = setupEnhancedIntelliSense;
window.getEditorStats = getEditorStats;
window.showEditorStats = showEditorStats;
window.showEditorStatsModal = showEditorStatsModal;
window.closeEditorStatsModal = closeEditorStatsModal;
window.refreshEditorStats = refreshEditorStats;

// --- Local Storage Functions ---
function loadSavedTheme() {
    // Load basic theme (light/dark)
    const savedTheme = localStorage.getItem('monaco_theme') || 'dark';
    const savedCustomTheme = localStorage.getItem('monaco_custom_theme');

    // Check if user has Dragan theme saved
    if (savedCustomTheme === 'dragan') {
        // Load Dragan theme
        defineDraganTheme();
        setTheme(savedTheme, 'dragan');
        console.log('🎨 Dragan theme restored');

        // Load color mode for Dragan theme
        const savedColorMode = localStorage.getItem('monaco_color_mode');
        if (savedColorMode === 'neon') {
            setTimeout(() => setColorMode('neon'), 50);
        }
    } else {
        // Default to VS Code themes (vs-code-dark/vs-code-light)
        defineVSCodeThemes(); // Make sure VS Code themes are defined
        setTheme(savedTheme);
        console.log('🎨 VS Code theme loaded (default):', savedTheme === 'dark' ? 'vs-code-dark' : 'vs-code-light');
    }

    // Update footer status immediately
    const themeDisplay = savedCustomTheme === 'dragan' ? 'Dragan' : (savedTheme === 'dark' ? 'VS Code Dark' : 'VS Code Light');
    updateFooterStatus(`${themeDisplay} theme loaded`, 'paint-brush');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 1000);
}

function loadSavedThemeOld() {
    const savedState = localStorage.getItem('monaco_editor_state');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            if (state.isDarkMode !== undefined) {
                const themeName = state.isDarkMode ? 'dark' : 'light';
                setTheme(themeName);
                console.log('Saved theme loaded:', themeName);

                // Update footer status after a brief delay to show the theme was loaded
                setTimeout(() => {
                    updateFooterStatus(`${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme restored`, 'paint-brush');
                    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
                }, 500);
            }
        } catch (error) {
            console.error('Error loading saved theme:', error);
            // Fallback to light theme
            setTheme('light');
        }
    } else {
        // No saved state, use light theme as default  
        setTheme('light');
        console.log('No saved theme found, using light theme');

        // Show default theme message
        setTimeout(() => {
            updateFooterStatus('Light theme (default)', 'paint-brush');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }, 500);
    }
}

function saveToLocalStorage() {
    if (!editor) {
        console.warn('Editor not initialized, cannot save to localStorage');
        return;
    }

    try {
        const languageSelector = document.getElementById('language-selector');
        const state = {
            code: editor.getValue(),
            language: languageSelector ? languageSelector.value : 'html',
            isDarkMode: getCurrentTheme() === 'dark',
            viewMode: getCurrentViewMode(),
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('monaco_editor_state', JSON.stringify(state));
        console.log('State saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        updateFooterStatus('Save failed', 'exclamation-triangle');
    }
}

function clearLocalStorage() {
    showConfirmationModal(
        'Clear Local Storage',
        'Are you sure you want to clear all saved data from local storage? This action cannot be undone.',
        'Yes, clear storage',
        'Cancel',
        'delete.png'
    ).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('monaco_editor_state');
            console.log('Local storage cleared');
            updateFooterStatus('Local storage cleared', 'broom');

            // Show success notification
            showCustomModal({
                title: 'Cleared!',
                text: 'Your local storage has been cleared.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}

function loadFromLocalStorage(isManualLoad = false) {
    if (!editor) {
        console.warn('Editor not initialized, cannot load from localStorage');
        updateFooterStatus('Load failed - editor not ready', 'exclamation-triangle');
        return;
    }

    const savedState = localStorage.getItem('monaco_editor_state');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            const currentCode = editor.getValue();

            // If there's current code and this is a manual load, show confirmation
            if (currentCode.trim() !== '' && isManualLoad) {
                showConfirmationModal(
                    'Load from Local Storage',
                    'Are you sure you want to load the saved state? All unsaved changes will be lost.',
                    'Yes, load saved state',
                    'Cancel',
                    'file.png'
                ).then((result) => {
                    if (result.isConfirmed) {
                        loadStateFromStorage(state, isManualLoad);
                    }
                });
            } else {
                // Auto-load or no current code
                loadStateFromStorage(state, isManualLoad);
            }
        } catch (error) {
            console.error('Error loading state from localStorage:', error);
            if (isManualLoad) {
                showCustomModal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to load state from localStorage. The saved data might be corrupted.'
                });
            }
            updateFooterStatus('Load failed', 'exclamation-triangle');
        }
    } else if (isManualLoad) {
        showCustomModal({
            icon: 'info',
            title: 'No saved state',
            text: 'No saved state found in localStorage'
        });
        updateFooterStatus('No saved data found', 'info-circle');
    }
}

function loadStateFromStorage(state, isManualLoad = false) {
    try {
        // Restore code
        if (state.code && editor) {
            editor.setValue(state.code);
        }

        // Restore language if selector exists
        const languageSelector = document.getElementById('language-selector');
        if (state.language && languageSelector) {
            languageSelector.value = state.language;
            monaco.editor.setModelLanguage(editor.getModel(), state.language);
        }

        // Restore theme
        if (typeof state.isDarkMode !== 'undefined') {
            setTheme(state.isDarkMode ? 'dark' : 'light');
        }

        // Restore view mode
        if (state.viewMode) {
            setPreviewMode(state.viewMode);
        }

        console.log('State loaded from localStorage');

        // Show notification when manually loaded
        if (isManualLoad) {
            const timestamp = state.timestamp ? new Date(state.timestamp).toLocaleString() : 'unknown time';
            showCustomModal({
                icon: 'success',
                title: 'Loaded!',
                text: `State loaded from ${timestamp}`,
                timer: 2000,
                showConfirmButton: false
            });
            updateFooterStatus('State loaded', 'download');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    } catch (error) {
        console.error('Error restoring state:', error);
        updateFooterStatus('Restore failed', 'exclamation-triangle');
        if (isManualLoad) {
            showCustomModal({
                icon: 'error',
                title: 'Restore Error',
                text: 'Failed to restore some settings from saved state.'
            });
        }
    }
}

// --- Core Functions ---
function updatePreview() {
    const code = editor.getValue();
    const previewFrame = document.getElementById('preview');

    try {
        // Completely reload the iframe to avoid variable redeclaration errors
        previewFrame.src = 'about:blank';

        // Wait a moment for the iframe to reload, then set the content
        setTimeout(() => {
            const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
            preview.open();
            preview.write(code);
            preview.close();
        }, 10);
    } catch (error) {
        console.error('Error updating preview:', error);

        // Fallback: try direct write
        try {
            const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
            preview.open();
            preview.write(code);
            preview.close();
        } catch (fallbackError) {
            console.error('Fallback preview update failed:', fallbackError);
            updateFooterStatus('Preview update failed', 'exclamation-triangle');
        }
    }
}

function stopPreview() {
    const previewFrame = document.getElementById('preview');

    try {
        // Stop loading by setting src to blank
        previewFrame.src = 'about:blank';

        // Clear any pending operations
        const preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
        if (preview) {
            preview.open();
            preview.close();
        }

        updateFooterStatus('Preview stopped', 'stop');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);

    } catch (error) {
        console.error('Error stopping preview:', error);
        updateFooterStatus('Stop failed', 'exclamation-triangle');
    }
}

function changeLanguage(language) {
    const currentLanguage = editor.getModel().getLanguageId();
    const currentCode = editor.getValue();

    // If switching to different language and has code, show confirmation
    if (currentLanguage !== language && currentCode.trim() !== '') {
        showConfirmationModal(
            'Change Language',
            `Are you sure you want to change the language from ${currentLanguage.toUpperCase()} to ${language.toUpperCase()}? The code will remain but syntax highlighting will change.`,
            'Yes, change language',
            'Cancel',
            'delete.png'
        ).then((result) => {
            if (result.isConfirmed) {
                monaco.editor.setModelLanguage(editor.getModel(), language);
                applySyntaxHighlighting(language);
                updateLanguageSpecificStyles(language);
                saveToLocalStorage();
                updateFooterStatus(`Language changed to ${language.toUpperCase()}`, 'code');
                setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
            } else {
                // Reset select to current language
                document.getElementById('language-selector').value = currentLanguage;
            }
        });
    } else {
        // Same language or no code, just change
        monaco.editor.setModelLanguage(editor.getModel(), language);
        applySyntaxHighlighting(language);
        updateLanguageSpecificStyles(language);
        saveToLocalStorage();
        updateFooterStatus(`Language set to ${language.toUpperCase()}`, 'code');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    }
}

function updateLanguageSpecificStyles(language) {
    if (!editor) return;

    const editorElement = editor.getDomNode();
    if (editorElement) {
        // Remove old language attributes
        editorElement.removeAttribute('data-mode-id');

        // Set new language attribute for CSS targeting
        editorElement.setAttribute('data-mode-id', language);

        console.log(`🎨 Language-specific styles applied for: ${language}`);
    }
}

function toggleColorMode() {
    if (!editor) return;

    // Check if Dragan theme is active, if not - activate it first
    const currentCustomTheme = localStorage.getItem('monaco_custom_theme');
    if (currentCustomTheme !== 'dragan') {
        updateFooterStatus('🎨 Switching to Dragan theme for color modes...', 'palette');
        setDraganTheme();
        // Wait a bit for theme to load, then continue
        setTimeout(() => {
            toggleColorMode();
        }, 300);
        return;
    }

    const editorElement = editor.getDomNode();
    if (editorElement) {
        const currentMode = editorElement.getAttribute('data-color-mode');
        const newMode = currentMode === 'neon' ? 'default' : 'neon';

        if (newMode === 'neon') {
            // ULTRA INTENSIVE NEON MODE - Żywe intensywne kolory
            editorElement.setAttribute('data-color-mode', 'neon');
            editorElement.style.filter = 'brightness(1.15) saturate(1.4) contrast(1.15)';
            editorElement.style.boxShadow = 'inset 0 0 30px rgba(255, 0, 255, 0.08), 0 0 50px rgba(0, 255, 255, 0.04)';
            updateFooterStatus('🔥 ULTRA NEON - Żywe intensywne kolory z efektami!', 'palette');
            console.log('🔥 ULTRA NEON MODE activated - Maximum intensity colors with glow effects!');

            // Add pulsing effect when activating
            editorElement.style.animation = 'pulse-glow 0.6s ease-in-out 2';
            setTimeout(() => {
                editorElement.style.animation = '';
            }, 1200);

        } else {
            // DEFAULT MODE - Normalne żywe kolory
            editorElement.removeAttribute('data-color-mode');
            editorElement.style.filter = '';
            editorElement.style.boxShadow = '';
            updateFooterStatus('🎨 DEFAULT - Normalne żywe kolory', 'palette');
            console.log('🎨 DEFAULT MODE activated - Normal vivid colors');
        }

        // Save preference
        localStorage.setItem('monaco_color_mode', newMode);

        // Force refresh to apply new styles immediately
        refreshMinimapStyles();
        refreshLineNumbers();

        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2500);
    }
}

function setColorMode(mode) {
    if (!editor) return;

    // Check if Dragan theme is active
    const currentCustomTheme = localStorage.getItem('monaco_custom_theme');
    if (currentCustomTheme !== 'dragan') {
        console.log('⚠️ Color modes are only available with Dragan theme');
        return;
    }

    const editorElement = editor.getDomNode();
    if (editorElement) {
        if (mode === 'neon') {
            // ULTRA INTENSIVE NEON MODE
            editorElement.setAttribute('data-color-mode', 'neon');
            editorElement.style.filter = 'brightness(1.15) saturate(1.4) contrast(1.15)';
            editorElement.style.boxShadow = 'inset 0 0 30px rgba(255, 0, 255, 0.08), 0 0 50px rgba(0, 255, 255, 0.04)';
            updateFooterStatus('🔥 ULTRA NEON MODE - Żywe intensywne kolory!', 'palette');
        } else {
            // DEFAULT MODE
            editorElement.removeAttribute('data-color-mode');
            editorElement.style.filter = '';
            editorElement.style.boxShadow = '';
            updateFooterStatus('🎨 DEFAULT MODE - Normalne żywe kolory!', 'palette');
        }

        localStorage.setItem('monaco_color_mode', mode);

        // Force minimap and line numbers refresh
        refreshMinimapStyles();
        refreshLineNumbers();

        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    }
}

function refreshMinimapStyles() {
    if (!editor) return;

    // Force Monaco to refresh minimap by triggering layout
    setTimeout(() => {
        editor.layout();

        // Trigger a small model change to refresh minimap decorations
        const model = editor.getModel();
        if (model) {
            const position = editor.getPosition();
            if (position) {
                // Temporarily set position to trigger refresh
                editor.setPosition(position);
            }
        }

        console.log('🗺️ Minimap styles refreshed');
    }, 50);
}

function refreshLineNumbers() {
    if (!editor) return;

    // Force Monaco to refresh line numbers
    setTimeout(() => {
        editor.layout();

        // Force line number refresh by triggering view update
        const model = editor.getModel();
        if (model) {
            const position = editor.getPosition();
            if (position) {
                // Move cursor to trigger line number update
                const newPosition = { lineNumber: position.lineNumber, column: position.column };
                editor.setPosition(newPosition);
                editor.revealPosition(newPosition);
            }
        }

        console.log('🔢 Line numbers refreshed');
    }, 50);
}

function applySyntaxHighlighting(language) {
    if (!editor) return;

    // Force Monaco to refresh syntax highlighting
    setTimeout(() => {
        // Trigger a layout update to apply new syntax colors
        editor.layout();

        // Force re-tokenization by making a small change and undoing it
        const model = editor.getModel();
        if (model) {
            const position = editor.getPosition();
            const currentValue = model.getValue();

            // Temporarily add a space and remove it to trigger re-tokenization
            model.pushEditOperations([], [{
                range: new monaco.Range(1, 1, 1, 1),
                text: ' '
            }], () => null);

            model.pushEditOperations([], [{
                range: new monaco.Range(1, 1, 1, 2),
                text: ''
            }], () => null);

            // Restore cursor position
            if (position) {
                editor.setPosition(position);
            }
        }

        updateFooterStatus(`Syntax highlighting applied for ${language.toUpperCase()}`, 'palette');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    }, 100);
}

async function formatCode() {
    const code = editor.getValue();
    const language = document.getElementById('language-selector').value;
    let parser;

    // Check if code is empty
    if (code.trim() === '') {
        showCustomModal({
            icon: 'info',
            title: 'Nothing to format',
            text: 'Please write some code first.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    // Check if Prettier is loaded
    if (typeof prettier === 'undefined') {
        showCustomModal({
            icon: 'error',
            title: 'Prettier not loaded',
            text: 'Prettier library is not available. Please refresh the page and try again.',
            timer: 3000,
            showConfirmButton: false
        });
        return;
    }

    switch (language) {
        case 'html':
            parser = 'html';
            break;
        case 'css':
            parser = 'css';
            break;
        case 'javascript':
            parser = 'babel';
            break;
        default:
            showCustomModal({
                icon: 'warning',
                title: 'Formatting not supported',
                text: `Formatting is not supported for ${language.toUpperCase()} yet. Only HTML, CSS, and JavaScript are supported.`,
                timer: 3000,
                showConfirmButton: false
            });
            return;
    }

    // Show confirmation for large code blocks
    if (code.length > 1000) {
        showConfirmationModal(
            'Format Code',
            'You are about to format a large code block. This action cannot be undone. Are you sure you want to continue?',
            'Yes, format code',
            'Cancel',
            'format.png'
        ).then(async (result) => {
            if (result.isConfirmed) {
                await performFormatting(code, parser);
            }
        });
    } else {
        await performFormatting(code, parser);
    }
}

async function performFormatting(code, parser) {
    try {
        // For Prettier 3.1.0 standalone, plugins are automatically available
        // when loaded via script tags. We don't need to explicitly pass them.

        // Prettier 3.1.0 configuration
        const formattedCode = await prettier.format(code, {
            parser: parser,
            // Basic formatting options
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: true,
            quoteProps: 'as-needed',
            trailingComma: 'es5',
            bracketSpacing: true,
            bracketSameLine: false,
            arrowParens: 'avoid',
            printWidth: 80,
        });
        editor.setValue(formattedCode);

        showCustomModal({
            icon: 'success',
            title: 'Code formatted!',
            text: 'Your code has been successfully formatted.',
            timer: 2000,
            showConfirmButton: false
        });
    } catch (error) {
        console.error("Formatting error:", error);
        showCustomModal({
            icon: 'error',
            title: 'Formatting Error',
            text: 'Could not format the code. Please check for syntax errors. Make sure your code is valid before formatting.'
        });
    }
}

function toggleComment() {
    const selection = editor.getSelection();
    const selectedText = editor.getModel().getValueInRange(selection);

    if (selectedText.trim() === '') {
        // No selection, comment current line
        editor.trigger('source', 'editor.action.commentLine');
        updateFooterStatus('Line comment toggled', 'comment');
    } else {
        // Selection exists, comment selected lines
        editor.trigger('source', 'editor.action.commentLine');
        updateFooterStatus('Selection comment toggled', 'comment');
    }

    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
}

function copyCode() {
    const code = editor.getValue();

    if (code.trim() === '') {
        showCustomModal({
            icon: 'info',
            title: 'Nothing to copy',
            text: 'Please write some code first.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    navigator.clipboard.writeText(code).then(() => {
        const lineCount = code.split('\n').length;
        const charCount = code.length;

        showCustomModal({
            icon: 'success',
            title: 'Copied!',
            text: `${lineCount} lines (${charCount} characters) copied to clipboard.`,
            timer: 2000,
            showConfirmButton: false
        });

        updateFooterStatus('Code copied to clipboard', 'clipboard');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    }).catch(() => {
        showCustomModal({
            icon: 'error',
            title: 'Copy failed',
            text: 'Could not copy to clipboard. Please try again.',
            timer: 2000,
            showConfirmButton: false
        });
    });
}


// --- File Operations ---
function newFile() {
    const currentCode = editor.getValue();

    if (currentCode.trim() !== '') {
        showConfirmationModal(
            'Create New File',
            'Are you sure you want to create a new file? All unsaved changes will be lost.',
            'Yes, create new file',
            'Cancel',
            'file.png'
        ).then((result) => {
            if (result.isConfirmed) {
                editor.setValue('');
                updateFooterStatus('New file created', 'file-plus');
                setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
            }
        });
    } else {
        editor.setValue('');
        updateFooterStatus('New file created', 'file-plus');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    }
}

function openFile() {
    const currentCode = editor.getValue();

    if (currentCode.trim() !== '') {
        showConfirmationModal(
            'Open File',
            'Are you sure you want to open a file? All unsaved changes will be lost.',
            'Yes, open file',
            'Cancel',
            'folder.png'
        ).then((result) => {
            if (result.isConfirmed) {
                openFileDialog();
            }
        });
    } else {
        openFileDialog();
    }
}

function openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.html,.css,.js,.txt,.json,.xml,.md,.py,.java,.cpp,.c,.php,.rb,.go,.ts,.jsx,.tsx,.vue,.scss,.sass,.less,.styl';
    input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event => {
                editor.setValue(event.target.result);
                updateFooterStatus(`File opened: ${file.name}`, 'folder-open');
                setTimeout(() => updateFooterStatus('Ready', 'circle'), 3000);
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function saveFile() {
    const code = editor.getValue();
    const language = document.getElementById('language-selector').value;

    if (code.trim() === '') {
        showCustomModal({
            icon: 'info',
            title: 'Nothing to save',
            text: 'Please write some code first.',
            timer: 2000,
            showConfirmButton: false
        });
        return;
    }

    // Determine file extension based on language
    const extensions = {
        'html': 'html',
        'css': 'css',
        'javascript': 'js',
        'python': 'py',
        'typescript': 'ts',
        'java': 'java',
        'csharp': 'cs',
        'php': 'php'
    };

    const extension = extensions[language] || 'txt';
    const filename = `code.${extension}`;

    // Show confirmation modal before saving
    showConfirmationModal(
        'Save File',
        `Are you sure you want to save the file as "${filename}"?`,
        'Yes, save file',
        'Cancel',
        'file.png'
    ).then((result) => {
        if (result.isConfirmed) {
            const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);

            // Show success notification
            const lineCount = code.split('\n').length;
            const charCount = code.length;

            showCustomModal({
                icon: 'success',
                title: 'File saved!',
                text: `${filename} saved with ${lineCount} lines (${charCount} characters).`,
                timer: 2000,
                showConfirmButton: false
            });

            updateFooterStatus(`File saved as ${filename}`, 'save');
        }
    });
}

// --- UI Toggles ---
document.getElementById('darkModeToggle').addEventListener('click', toggleTheme);

document.getElementById('run').addEventListener('click', updatePreview);
document.getElementById('stop').addEventListener('click', stopPreview);

function setPreviewMode(mode) {
    const editorContainer = document.getElementById('editor-container');
    const previewContainer = document.getElementById('preview-container');

    // Update view layout
    if (mode === 'split') {
        editorContainer.style.display = 'block';
        previewContainer.style.display = 'block';
        editorContainer.style.width = '50%';
        previewContainer.style.width = '50%';
    } else if (mode === 'editor') {
        editorContainer.style.display = 'block';
        previewContainer.style.display = 'none';
        editorContainer.style.width = '100%';
    } else if (mode === 'full') {
        editorContainer.style.display = 'none';
        previewContainer.style.display = 'block';
        previewContainer.style.width = '100%';
    }

    // Update active button states
    updateViewModeButtons(mode);

    // Force Monaco Editor layout update
    if (editor && (mode === 'split' || mode === 'editor')) {
        setTimeout(() => {
            editor.layout();
        }, 100);
    }

    // Update footer status
    const modeNames = {
        'split': 'Split View',
        'editor': 'Editor Only',
        'full': 'Preview Only'
    };
    updateFooterStatus(`View mode: ${modeNames[mode]}`, 'columns');
    setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
}

function updateViewModeButtons(activeMode) {
    // Remove active class from all view mode buttons
    const viewModeButtons = document.querySelectorAll('.view-mode-btn');
    viewModeButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Add active class to the current mode button
    const activeButton = document.querySelector(`.view-mode-btn[data-mode="${activeMode}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function getCurrentViewMode() {
    const activeButton = document.querySelector('.view-mode-btn.active');
    return activeButton ? activeButton.getAttribute('data-mode') : 'split';
}

// --- Custom Modal Functions (replacing SweetAlert2) ---
function showCustomModal(options) {
    const {
        title = '',
        text = '',
        icon = 'info',
        showConfirmButton = true,
        showCancelButton = false,
        confirmButtonText = 'OK',
        cancelButtonText = 'Cancel',
        timer = null,
        onConfirm = null,
        onCancel = null
    } = options;

    // Create modal HTML
    const modalHTML = `
        <div class="custom-modal-overlay" id="customModal">
            <div class="custom-modal-content">
                <div class="custom-modal-header">
                    <div class="custom-modal-icon ${icon}">
                        <i class="fas ${getIconClass(icon)}"></i>
                    </div>
                    <h3 class="custom-modal-title">${title}</h3>
                </div>
                <div class="custom-modal-body">
                    <p class="custom-modal-text">${text}</p>
                </div>
                <div class="custom-modal-actions">
                    ${showCancelButton ? `<button class="custom-modal-btn cancel-btn" id="modalCancel">${cancelButtonText}</button>` : ''}
                    ${showConfirmButton ? `<button class="custom-modal-btn confirm-btn" id="modalConfirm">${confirmButtonText}</button>` : ''}
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('customModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('customModal');

    // Add event listeners
    const confirmBtn = document.getElementById('modalConfirm');
    const cancelBtn = document.getElementById('modalCancel');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            modal.remove();
            if (onConfirm) onConfirm();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.remove();
            if (onCancel) onCancel();
        });
    }

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            if (onCancel) onCancel();
        }
    });

    // Auto-close with timer
    if (timer) {
        setTimeout(() => {
            if (document.getElementById('customModal')) {
                modal.remove();
            }
        }, timer);
    }

    // Return promise-like object for compatibility
    return {
        then: (callback) => {
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => callback({ isConfirmed: true }));
            }
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => callback({ isConfirmed: false }));
            }
            return { catch: () => { } };
        }
    };
}

function getIconClass(icon) {
    const iconMap = {
        'success': 'fa-check-circle',
        'error': 'fa-times-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    };
    return iconMap[icon] || 'fa-info-circle';
}

function showConfirmationModal(title, text, confirmText, cancelText = 'Cancel', backgroundImage = 'file.png') {
    return showCustomModal({
        title: title,
        text: text,
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
    });
}

// --- Ripple Effect Functions ---
function createRipple(event) {
    const button = event.currentTarget;

    // Remove existing ripples
    const existingRipples = button.querySelectorAll('.ripple');
    existingRipples.forEach(ripple => ripple.remove());

    // Create new ripple
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Calculate ripple position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Set ripple size and position
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    // Add ripple to button
    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

function initializeRippleEffect() {
    // Add ripple effect to toolbar buttons
    const toolbarButtons = document.querySelectorAll('.toolbar-button');
    toolbarButtons.forEach(button => {
        button.classList.add('ripple-button');
        button.addEventListener('click', createRipple);
    });

    // Add ripple effect to footer buttons
    const footerButtons = document.querySelectorAll('.footer-btn');
    footerButtons.forEach(button => {
        button.classList.add('ripple-button');
        button.addEventListener('click', createRipple);
    });

    // Add ripple effect to main action buttons
    const actionButtons = document.querySelectorAll('.my-btn');
    actionButtons.forEach(button => {
        button.classList.add('ripple-button');
        button.addEventListener('click', createRipple);
    });
}

// --- Info Modal Functions ---
function createInfoModal() {
    const modalHTML = `
        <div id="infoModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-info-circle"></i> Advanced Code Editor - Help & Info</h2>
                    <button class="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="info-section">
                        <h3><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h3>
                        <div class="shortcuts-grid">
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + N</span>
                                <span class="shortcut-desc">New File</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + O</span>
                                <span class="shortcut-desc">Open File</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + S</span>
                                <span class="shortcut-desc">Save File</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + Z</span>
                                <span class="shortcut-desc">Undo</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + Y</span>
                                <span class="shortcut-desc">Redo</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + F</span>
                                <span class="shortcut-desc">Find</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + H</span>
                                <span class="shortcut-desc">Replace</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + /</span>
                                <span class="shortcut-desc">Toggle Comment</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Alt + Shift + F</span>
                                <span class="shortcut-desc">Format Code</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + .</span>
                                <span class="shortcut-desc">Stop Preview</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + Shift + B</span>
                                <span class="shortcut-desc">Toggle Code Guides</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">F1</span>
                                <span class="shortcut-desc">Help & Info</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">F11</span>
                                <span class="shortcut-desc">Fullscreen</span>
                            </div>
                            <div class="shortcut-item">
                                <span class="shortcut-key">Ctrl + Space</span>
                                <span class="shortcut-desc">IntelliSense</span>
                            </div>
                        </div>
                    </div>

                    <div class="info-section">
                        <h3><i class="fas fa-tools"></i> Features</h3>
                        <ul class="features-list">
                            <li><strong>Monaco Editor:</strong> Full-featured code editor with syntax highlighting</li>
                            <li><strong>Multi-language Support:</strong> HTML, CSS, JavaScript, Python, TypeScript, Java, C#, PHP</li>
                            <li><strong>Live Preview:</strong> Real-time preview for HTML code</li>
                            <li><strong>Code Formatting:</strong> Prettier integration for HTML, CSS, and JavaScript</li>
                            <li><strong>Dark/Light Theme:</strong> Toggle between themes</li>
                            <li><strong>Local Storage:</strong> Automatically saves your work</li>
                            <li><strong>File Operations:</strong> New, Open, Save files</li>
                            <li><strong>View Modes:</strong> Split view, Editor only, Preview only</li>
                            <li><strong>IntelliSense:</strong> Auto-completion and code suggestions</li>
                            <li><strong>Error Detection:</strong> Real-time syntax error highlighting</li>
                            <li><strong>Color Decorations:</strong> Visual color previews for hex, RGB, and HSL values</li>
                            <li><strong>Bracket Guides:</strong> Toggle-able indent guides for better code structure</li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <h3><i class="fas fa-lightbulb"></i> Tips & Tricks</h3>
                        <ul class="tips-list">
                            <li>Use <strong>Ctrl + Space</strong> to trigger IntelliSense suggestions</li>
                            <li>Press <strong>Ctrl + K Ctrl + C</strong> to comment multiple lines</li>
                            <li>Use <strong>Alt + Up/Down</strong> to move lines up or down</li>
                            <li>Hold <strong>Alt</strong> and click to create multiple cursors</li>
                            <li>Press <strong>Ctrl + D</strong> to select next occurrence of current word</li>
                            <li>Use <strong>Ctrl + G</strong> to go to specific line number</li>
                            <li>Right-click in editor for context menu with more options</li>
                            <li>Your work is automatically saved to local storage</li>
                            <li>Use the language selector to switch between different programming languages</li>
                            <li>Format your code regularly for better readability</li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <h3><i class="fas fa-book"></i> About</h3>
                        <p>Advanced Code Editor is a web-based code editor built with Monaco Editor (the editor that powers VS Code). It provides a powerful coding environment with syntax highlighting, IntelliSense, and live preview capabilities.</p>
                        <p><strong>Version:</strong> 1.0.0</p>
                        <p><strong>Technologies:</strong> Monaco Editor, Custom Modals, Prettier, JavaScript ES6+</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Create modal element
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement.firstElementChild);

    return document.getElementById('infoModal');
}

function showInfoModal() {
    let modal = document.getElementById('infoModal');

    // Create modal if it doesn't exist
    if (!modal) {
        modal = createInfoModal();

        // Add event listeners
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', hideInfoModal);

        // Close modal when clicking outside
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                hideInfoModal();
            }
        });
    }

    // Show modal
    modal.classList.add('show');

    // Disable scrolling on body
    document.body.style.overflow = 'hidden';

    // Focus on modal for accessibility
    modal.focus();
}

function hideInfoModal() {
    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.classList.remove('show');

        // Re-enable scrolling on body
        document.body.style.overflow = 'auto';

        // Return focus to editor
        if (editor) {
            editor.focus();
        }

        // Remove modal from DOM after animation
        setTimeout(() => {
            if (modal && !modal.classList.contains('show')) {
                modal.remove();
            }
        }, 300);
    }
}

// Global keyboard shortcuts
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (e) {
        const modal = document.getElementById('infoModal');

        // Close modal with Escape key
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            hideInfoModal();
            return;
        }

        // F1 - Show help modal
        if (e.key === 'F1') {
            e.preventDefault();
            showInfoModal();
            return;
        }

        // Only process shortcuts if modal is not open
        if (modal && modal.classList.contains('show')) {
            return;
        }

        // Ctrl+N - New file
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            newFile();
        }

        // Ctrl+O - Open file
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            openFile();
        }

        // Ctrl+S - Save file
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveFile();
        }

        // Alt+Shift+F - Format code
        if (e.altKey && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            formatCode();
        }

        // Ctrl+. - Stop preview
        if (e.ctrlKey && e.key === '.') {
            e.preventDefault();
            stopPreview();
        }


        // Ctrl+Shift+B - Toggle Bracket Guides
        if (e.ctrlKey && e.shiftKey && e.key === 'B') {
            e.preventDefault();
            toggleBracketGuides();
        }






        // F11 - Toggle fullscreen
        if (e.key === 'F11') {
            e.preventDefault();
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        }
    });
});

// --- Footer Functions ---
function toggleFooter() {
    const footerContent = document.getElementById('footer-content');
    const footerToggle = document.getElementById('footer-toggle');

    if (footerContent && footerToggle) {
        const isExpanded = footerContent.classList.contains('expanded');

        if (isExpanded) {
            // Collapse
            footerContent.classList.remove('expanded');
            footerToggle.classList.remove('rotated');
            footerToggle.innerHTML = '<i class="fas fa-chevron-up"></i>';
        } else {
            // Expand
            footerContent.classList.add('expanded');
            footerToggle.classList.add('rotated');
            footerToggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
        }
    }
}

function updateFooterStatus(status, icon = 'circle') {
    const footerStatus = document.getElementById('footer-status');
    if (footerStatus) {
        footerStatus.innerHTML = `<i class="fas fa-${icon}"></i> ${status}`;

        // Add status color based on status and icon
        footerStatus.className = 'status-indicator';

        // Run related statuses (green)
        if (status.includes('Preview updated') ||
            status.includes('Updating preview') ||
            status.toLowerCase().includes('preview') && (icon === 'check' || icon === 'spinner')) {
            footerStatus.classList.add('status-run');
        }
        // Stop related statuses (red)  
        else if (status.includes('Preview stopped') ||
            status.includes('Stop') ||
            icon === 'stop') {
            footerStatus.classList.add('status-stop');
        }
        // Error statuses (red)
        else if (status.includes('Error') || status.includes('error') || status.includes('failed')) {
            footerStatus.classList.add('status-error');
        }
        // Success statuses (green)
        else if (status.includes('Success') || status.includes('success')) {
            footerStatus.classList.add('status-success');
        }
        // Default ready status
        else {
            footerStatus.classList.add('status-ready');
        }
    }
}

// Update status when actions are performed
document.addEventListener('DOMContentLoaded', function () {
    // Update status on various actions
    const originalFormatCode = window.formatCode;
    window.formatCode = async function () {
        updateFooterStatus('Formatting...', 'spinner');
        try {
            await originalFormatCode();
            updateFooterStatus('Code formatted', 'check');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        } catch (error) {
            updateFooterStatus('Format error', 'exclamation-triangle');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 3000);
        }
    };

    const originalSaveFile = window.saveFile;
    window.saveFile = function () {
        updateFooterStatus('Saving...', 'spinner');
        originalSaveFile();
        updateFooterStatus('File saved', 'check');
        setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
    };

    const originalUpdatePreview = window.updatePreview;
    window.updatePreview = function () {
        updateFooterStatus('Updating preview...', 'spinner');
        try {
            originalUpdatePreview();
            setTimeout(() => {
                updateFooterStatus('Preview updated', 'check');
                setTimeout(() => updateFooterStatus('Ready', 'circle'), 1000);
            }, 100);
        } catch (error) {
            updateFooterStatus('Preview error', 'exclamation-triangle');
            setTimeout(() => updateFooterStatus('Ready', 'circle'), 2000);
        }
    };
});

// Auto-update current year in footer
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Update year on page load and every year
document.addEventListener('DOMContentLoaded', updateCurrentYear);
setInterval(updateCurrentYear, 365 * 24 * 60 * 60 * 1000); // Update every year


// Fix Monaco Editor layout issues
function fixMonacoLayoutOverride() {
    // Enhanced checks before applying fixes
    if (!window.editor || typeof window.editor.layout !== 'function') {
        console.warn('Monaco Editor not ready yet');
        return false;
    }

    if (!document.querySelector('.monaco-editor')) {
        console.warn('Monaco Editor DOM not ready yet');
        return false;
    }

    try {
        console.log('Fixing Monaco Editor layout...');

        // Force layout recalculation
        window.editor.layout();

        // Additional fix for line height consistency
        const viewLines = document.querySelectorAll('.monaco-editor .view-line');
        if (viewLines.length > 0) {
            viewLines.forEach(line => {
                line.style.lineHeight = '21px';
                line.style.height = '21px';
            });
        }

        // Update Monaco options to prevent line collapsing
        if (typeof window.editor.updateOptions === 'function') {
            window.editor.updateOptions({
                automaticLayout: false,
                lineHeight: 21,
                fontSize: 14,
                fontFamily: 'Share Tech Mono, Consolas, Monaco, monospace',
                scrollBeyondLastLine: false,
                scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible',
                    handleMouseWheel: true,
                    useShadows: false
                }
            });
        }

        // Update footer status if function exists
        if (typeof window.updateFooterStatus === 'function') {
            window.updateFooterStatus('Editor layout fixed', 'tools');
            setTimeout(() => window.updateFooterStatus('Ready', 'circle'), 2000);
        } else {
            console.log('Footer status update function not available');
        }

        console.log('Monaco Editor layout fixed successfully');
        return true;
    } catch (error) {
        console.error('Error fixing Monaco Editor layout:', error);
        return false;
    }
}

// Override the existing fixMonacoLayout function if it exists
window.fixMonacoLayout = fixMonacoLayoutOverride;

// Setup resize observer for automatic layout fixes
function setupLayoutObserver() {
    if (window.ResizeObserver && window.editor) {
        const resizeObserver = new ResizeObserver(() => {
            if (window.editor) {
                window.editor.layout();
            }
        });

        const editorElement = document.getElementById('editor');
        if (editorElement) {
            resizeObserver.observe(editorElement);
        }
    }
}

// Add keyboard shortcut for layout fix
document.addEventListener('keydown', function (e) {
    // Ctrl+Shift+L - Fix Monaco Layout
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        fixMonacoLayoutOverride();
    }
});

// Setup layout fixes after Monaco is initialized
setTimeout(() => {
    if (window.editor && typeof window.editor.layout === 'function') {
        console.log('Monaco Editor detected, applying layout fixes...');

        if (fixMonacoLayoutOverride()) {
            setupLayoutObserver();
            console.log('Initial Monaco layout fix completed');
        }

        // Add window resize listener
        window.addEventListener('resize', () => {
            if (window.editor && typeof window.editor.layout === 'function') {
                setTimeout(() => {
                    try {
                        window.editor.layout();
                    } catch (e) {
                        console.warn('Error in resize layout:', e);
                    }
                }, 100);
            }
        });

        // Override theme function to include layout fix
        const originalSetTheme = window.setTheme;
        if (typeof originalSetTheme === 'function') {
            window.setTheme = function (theme) {
                originalSetTheme(theme);
                setTimeout(() => {
                    fixMonacoLayoutOverride();
                }, 150);
            };
        }

        // Override preview mode function to include layout fix
        const originalSetPreviewMode = window.setPreviewMode;
        if (typeof originalSetPreviewMode === 'function') {
            window.setPreviewMode = function (mode) {
                originalSetPreviewMode(mode);
                setTimeout(() => {
                    fixMonacoLayoutOverride();
                }, 150);
            };
        }
    }
}, 2000); // Wait 2 seconds after initialization

// Simple backup fix that runs after full page load
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.editor && typeof window.editor.layout === 'function') {
            fixMonacoLayoutOverride();
            console.log('Post-load Monaco layout fix applied');
        }
    }, 3000); // Wait 3 seconds after page load
});

// Periodic maintenance check (reduced frequency)
setInterval(() => {
    if (window.editor && typeof window.editor.layout === 'function') {
        const viewLines = document.querySelectorAll('.monaco-editor .view-line');
        if (viewLines.length > 0) {
            let needsFix = false;
            try {
                // Check only first few lines for performance
                for (let i = 0; i < Math.min(3, viewLines.length); i++) {
                    const computedStyle = window.getComputedStyle(viewLines[i]);
                    if (computedStyle.lineHeight !== '21px' || computedStyle.height !== '21px') {
                        needsFix = true;
                        break;
                    }
                }
                if (needsFix) {
                    fixMonacoLayoutOverride();
                }
            } catch (error) {
                // Silently handle errors
            }
        }
    }
}, 30000); // Check every 30 seconds
