// Monaco Editor Styles and Themes
// Extracted from script.js for better organization
// Contains all Monaco Editor theme definitions and styling functions

// --- VS Code Theme Integration Configuration ---
const VS_CODE_THEME_CONFIG = {
    verboseLogging: false, // Set to true for detailed logs
    enablePeriodicRefresh: true,
    refreshInterval: 1000 // 1 second instead of 5
};

// --- Dragan Theme Definition ---
function defineDraganTheme() {
    // Define the Enhanced Dragan Color Theme for Monaco Editor
    // Ultra-vibrant cyberpunk color scheme with improved contrast and readability
    monaco.editor.defineTheme('dragan', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            // Core Keywords - Yellow (jak na screenshocie)
            { token: 'keyword', foreground: 'FFFF00', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: 'FFFF00', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: 'ff4081' },
            { token: 'storage.type', foreground: 'FFFF00', fontStyle: 'bold' },
            { token: 'storage.modifier', foreground: 'e91e63' },
            { token: 'keyword.other.unit', foreground: 'ff6b35' },

            // Strings - Neon Green (URL-e) i Cyan (parametry)
            { token: 'string', foreground: '00ff41' },
            { token: 'string.quoted', foreground: '00ffff' },
            { token: 'string.template', foreground: '39ff14' },
            { token: 'string.regexp', foreground: '7fff00' },
            { token: 'string.interpolated', foreground: '00ff7f' },

            // Comments - Bright Cyan
            { token: 'comment', foreground: '00ffff', fontStyle: 'italic' },
            { token: 'comment.line', foreground: '00ffff', fontStyle: 'italic' },
            { token: 'comment.block', foreground: '40e0d0', fontStyle: 'italic' },
            { token: 'comment.documentation', foreground: '87ceeb', fontStyle: 'italic' },

            // Numbers - Bright Orange
            { token: 'number', foreground: 'ff8c00' },
            { token: 'number.hex', foreground: 'ff6347' },
            { token: 'number.float', foreground: 'ffa500' },
            { token: 'constant.numeric', foreground: 'ff7f50' },
            { token: 'constant.character.numeric', foreground: 'ff4500' },

            // Functions - Orange (jak na screenshocie)
            { token: 'function', foreground: 'ff8c00', fontStyle: 'bold' },
            { token: 'function.call', foreground: 'ff8c00' },
            { token: 'method', foreground: 'ff8c00' },
            { token: 'entity.name.function', foreground: 'ff8c00', fontStyle: 'bold' },
            { token: 'support.function', foreground: 'ff8c00' },

            // Variables - Bright Yellow
            { token: 'variable', foreground: 'ffff00' },
            { token: 'variable.parameter', foreground: 'ffd700' },
            { token: 'variable.other', foreground: 'ffff33' },
            { token: 'entity.name.variable', foreground: 'f0e68c' },
            { token: 'variable.language', foreground: 'ffff66', fontStyle: 'italic' },

            // Types & Classes - Purple Spectrum
            { token: 'type', foreground: '8a2be2', fontStyle: 'bold' },
            { token: 'type.class', foreground: '9932cc', fontStyle: 'bold' },
            { token: 'type.interface', foreground: 'ba55d3', fontStyle: 'bold' },
            { token: 'entity.name.type', foreground: '8b00ff' },
            { token: 'entity.name.class', foreground: '9370db', fontStyle: 'bold' },

            // HTML Tags - Cyan (jak na screenshocie)
            { token: 'tag', foreground: '00ffff', fontStyle: 'bold' },
            { token: 'tag.name', foreground: '00ffff', fontStyle: 'bold' },
            { token: 'entity.name.tag', foreground: '00ffff', fontStyle: 'bold' },
            { token: 'punctuation.definition.tag', foreground: 'ff69b4' },

            // HTML Attributes - Lime Green
            { token: 'attribute.name', foreground: '32cd32' },
            { token: 'entity.other.attribute-name', foreground: '32cd32' },
            { token: 'attribute.value', foreground: 'ffff00' },
            { token: 'string.quoted.double.html', foreground: 'ffff00' },

            // CSS Properties - Aqua/Cyan
            { token: 'property', foreground: '00ffff' },
            { token: 'support.type.property-name', foreground: '00ffff' },
            { token: 'support.type.property-name.css', foreground: '40e0d0' },
            { token: 'property.value', foreground: 'ff69b4' },
            { token: 'selector', foreground: 'ff1493', fontStyle: 'bold' },

            // CSS Variables - Orange Accent
            { token: 'variable.css', foreground: 'fd810d' },
            { token: 'variable.argument.css', foreground: 'ff8c00' },
            { token: 'support.function.var.css', foreground: 'ffa500' },
            { token: 'punctuation.definition.custom-property.css', foreground: 'ff7f50' },

            // Operators & Punctuation - Vibrant Colors
            { token: 'operator', foreground: 'ff4500' },
            { token: 'delimiter', foreground: 'ff6347' },
            { token: 'punctuation', foreground: 'ff7f50' },
            { token: 'delimiter.bracket', foreground: 'ffd700' },
            { token: 'delimiter.parenthesis', foreground: 'ff00ff' },
            { token: 'delimiter.square', foreground: 'ff6347' },
            { token: 'delimiter.curly', foreground: '00ced1' },

            // Language Specific Enhancements
            // JavaScript (kolory jak na screenshocie)
            { token: 'keyword.js', foreground: 'FFFF00', fontStyle: 'bold' },
            { token: 'support.function.js', foreground: '00FFFF' },
            { token: 'support.class.js', foreground: '00FFFF' },
            { token: 'variable.language.js', foreground: 'FFFFFF', fontStyle: 'italic' },
            { token: 'constant.language.js', foreground: 'FFFF00', fontStyle: 'italic' },

            // TypeScript
            { token: 'keyword.ts', foreground: 'ff00ff', fontStyle: 'bold' },
            { token: 'support.type.ts', foreground: '8000ff', fontStyle: 'bold' },
            { token: 'entity.name.type.ts', foreground: '9370db' },
            { token: 'keyword.operator.type.ts', foreground: 'ff4081' },

            // Python
            { token: 'keyword.python', foreground: 'ff00ff', fontStyle: 'bold' },
            { token: 'support.function.builtin.python', foreground: '0080ff' },
            { token: 'support.type.python', foreground: '8000ff' },
            { token: 'constant.language.python', foreground: 'ff8000', fontStyle: 'italic' },
            { token: 'string.quoted.docstring.python', foreground: '00ffff', fontStyle: 'italic' },

            // PHP
            { token: 'keyword.php', foreground: 'ff00ff', fontStyle: 'bold' },
            { token: 'support.function.php', foreground: '0080ff' },
            { token: 'variable.other.php', foreground: 'ffff00' },
            { token: 'punctuation.definition.variable.php', foreground: 'ff00ff' },

            // Java
            { token: 'keyword.java', foreground: 'ff00ff', fontStyle: 'bold' },
            { token: 'storage.type.java', foreground: '8000ff', fontStyle: 'bold' },
            { token: 'storage.modifier.java', foreground: 'e91e63' },
            { token: 'entity.name.type.java', foreground: '9370db' },

            // C#
            { token: 'keyword.cs', foreground: 'ff00ff', fontStyle: 'bold' },
            { token: 'storage.type.cs', foreground: '8000ff', fontStyle: 'bold' },
            { token: 'entity.name.type.cs', foreground: '9370db' },
            { token: 'keyword.operator.cs', foreground: 'ff4081' },

            // CSS Enhancements
            { token: 'support.constant.property-value.css', foreground: 'ff69b4' },
            { token: 'keyword.other.unit.css', foreground: 'ff8c00' },
            { token: 'entity.other.attribute-name.pseudo-class.css', foreground: 'ff00ff' },
            { token: 'entity.other.attribute-name.pseudo-element.css', foreground: 'ff1493' },

            // JSON
            { token: 'support.type.property-name.json', foreground: '00ffff' },
            { token: 'string.quoted.double.json', foreground: 'ffa500' },
            { token: 'constant.numeric.json', foreground: 'ff8000' },
            { token: 'constant.language.json', foreground: 'ff00ff' },

            // Markdown
            { token: 'markup.heading.markdown', foreground: 'ff1493', fontStyle: 'bold' },
            { token: 'markup.bold.markdown', foreground: 'ff8000', fontStyle: 'bold' },
            { token: 'markup.italic.markdown', foreground: '0080ff', fontStyle: 'italic' },
            { token: 'markup.inline.raw.markdown', foreground: 'ffa500' },
            { token: 'markup.fenced_code.block.markdown', foreground: '00ff41' },
        ],
        colors: {
            // Core Editor Colors
            'editor.background': '#0d0d0d',
            'editor.foreground': '#f8f8f2',
            'editorLineNumber.foreground': '#888888',
            'editorLineNumber.activeForeground': '#ffb875',

            // Selection & Highlighting - Improved Contrast
            'editor.selectionBackground': '#ff910040',
            'editor.selectionHighlightBackground': '#ff910030',
            'editor.lineHighlightBackground': '#1a1a1a',
            'editor.wordHighlightBackground': '#ff910020',
            'editor.wordHighlightStrongBackground': '#ff910035',

            // Cursor & Find
            'editorCursor.foreground': '#ff9900',
            'editor.findMatchBackground': '#ffbf7560',
            'editor.findMatchHighlightBackground': '#ffbf7530',
            'editor.findRangeHighlightBackground': '#ff910020',

            // Bracket colors - VS Code integration
            'editorBracketHighlight.foreground1': '#FF75B5',
            'editorBracketHighlight.foreground2': '#45A9F9',
            'editorBracketHighlight.foreground3': '#924cee',
            'editorBracketHighlight.foreground4': '#46fc55',
            'editorBracketHighlight.foreground5': '#FFB86C',
            'editorBracketHighlight.foreground6': '#F39C12',
            'editorBracketHighlight.unexpectedBracket.foreground': '#FF2C6D',

            // Widget colors - Enhanced Interface
            'editorWidget.background': 'var(--background-color)', // Dark background matching editor
            'editorWidget.border': '#fd810d50', // Orange border
            'editorWidget.foreground': '#ffffff',
            'editorWidget.resizeBorder': '#fd810d',

            // Hover widget - Orange theme
            'editorHoverWidget.background': '#1a1a1a',
            'editorHoverWidget.border': '#fd810d60',
            'editorHoverWidget.foreground': '#ffffff',
            'editorHoverWidget.highlightForeground': '#fd810d',
            'editorHoverWidget.statusBarBackground': '#0d0d0d',

            // Suggest widget - Orange theme
            'editorSuggestWidget.background': '#1a1a1a', // Dark background
            'editorSuggestWidget.border': '#fd810d50', // Orange border
            'editorSuggestWidget.foreground': '#ffffff',
            'editorSuggestWidget.selectedBackground': '#fd810d40', // Orange selection
            'editorSuggestWidget.highlightForeground': '#fd810d', // Orange highlight
            'editorSuggestWidget.focusHighlightForeground': '#ff8c00', // Lighter orange focus

            // Menu colors - Enhanced Interface
            'menu.background': '#1a1a1a', // Dark background matching editor
            'menu.foreground': '#ffffff',
            'menu.selectionBackground': '#fd810d40', // Orange selection
            'menu.selectionForeground': '#ffffff',
            'menu.separatorBackground': '#343a40',
            'menu.border': '#fd810d30',

            // Input - Orange theme
            'input.background': '#0d0d0d', // Dark background
            'input.border': '#fd810d60', // Orange border
            'input.foreground': '#ffffff',
            'input.placeholderForeground': '#adb5bd',
            'inputOption.activeBorder': '#fd810d',
            'inputOption.activeBackground': '#fd810d20',

            // Button - Orange theme
            'button.background': '#fd810d', // Orange primary button
            'button.foreground': '#ffffff',
            'button.hoverBackground': '#e67e22',
            'button.secondaryBackground': '#343a40',
            'button.secondaryForeground': '#ffffff',
            'button.secondaryHoverBackground': '#495057',

            // Minimap
            'minimap.background': '#1e1e1e',
            'minimap.selectionHighlight': '#ff9900',
            'minimap.findMatchHighlight': '#fd810d',

            // Scrollbar - dark theme with orange accents
            'scrollbarSlider.background': '#6c757d4d',
            'scrollbarSlider.hoverBackground': '#fd810d66',
            'scrollbarSlider.activeBackground': '#fd810d99',

            // Gutter & Margins
            'editorGutter.background': '#0d0d0d',
            'editorGutter.modifiedBackground': '#ffb86c',
            'editorGutter.addedBackground': '#50fa7b',
            'editorGutter.deletedBackground': '#ff5555',

            // Overview Ruler
            'editorOverviewRuler.background': '#1a1a1a',
            'editorOverviewRuler.selectionHighlightForeground': '#ff9100',
            'editorOverviewRuler.findMatchForeground': '#ffb86c',
            'editorOverviewRuler.errorForeground': '#ff5555',
            'editorOverviewRuler.warningForeground': '#ffb86c',

            // Error & Warning Squiggles
            'editorError.foreground': '#ff5555',
            'editorWarning.foreground': '#ffb86c',
            'editorInfo.foreground': '#8be9fd',

            // Indent Guides
            'editorIndentGuide.background': '#44475a',
            'editorIndentGuide.activeBackground': '#ff9100',

            // Rulers
            'editorRuler.foreground': '#44475a',
        }
    });

    console.log('🎨 Enhanced Dragan Color Theme defined successfully');
}

// --- VS Code Themes Definition ---
function defineVSCodeThemes() {
    // Helper function to get CSS variable value with improved error handling
    function getCSSVariable(variable, fallback) {
        try {
            const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
            return value || fallback;
        } catch (error) {
            if (VS_CODE_THEME_CONFIG.verboseLogging) {
                console.warn(`Failed to get CSS variable ${variable}:`, error);
            }
            return fallback;
        }
    }

    // Helper function to convert CSS color to Monaco hex format with validation
    function convertCSSColorToMonacoHex(cssColor) {
        if (!cssColor) return '000000';

        // Remove # if present and ensure proper format
        let color = cssColor.replace('#', '').toLowerCase();

        // Handle 3-character hex codes
        if (color.length === 3) {
            color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
        }

        // Validate hex format
        if (!/^[0-9a-f]{6}$/i.test(color)) {
            if (VS_CODE_THEME_CONFIG.verboseLogging) {
                console.warn(`Invalid color format: ${cssColor}, using fallback`);
            }
            return '000000';
        }

        return color;
    }

    // Define VS Code Light Theme
    monaco.editor.defineTheme('vs-code-light', {
        base: 'vs',
        inherit: true,
        rules: [
            // Basic syntax highlighting using VS Code colors
            // Keywords - Blue
            { token: 'keyword', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: '000000' },
            { token: 'storage.type', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'storage.modifier', foreground: '0000ff' },
            { token: 'keyword.other.unit', foreground: '09885a' },

            // Strings - Green
            { token: 'string', foreground: '008000' },
            { token: 'string.quoted', foreground: '008000' },
            { token: 'string.template', foreground: '008000' },
            { token: 'string.regexp', foreground: '008000' },
            { token: 'string.interpolated', foreground: '008000' },

            // Comments - Green
            { token: 'comment', foreground: '008000', fontStyle: 'italic' },
            { token: 'comment.line', foreground: '008000', fontStyle: 'italic' },
            { token: 'comment.block', foreground: '008000', fontStyle: 'italic' },
            { token: 'comment.documentation', foreground: '008000', fontStyle: 'italic' },

            // Numbers - Blue
            { token: 'number', foreground: '09885a' },
            { token: 'number.hex', foreground: '09885a' },
            { token: 'number.float', foreground: '09885a' },
            { token: 'constant.numeric', foreground: '09885a' },
            { token: 'constant.character.numeric', foreground: '09885a' },

            // Functions - Black
            { token: 'function', foreground: '000000', fontStyle: 'bold' },
            { token: 'function.call', foreground: '000000' },
            { token: 'method', foreground: '000000' },
            { token: 'entity.name.function', foreground: '000000', fontStyle: 'bold' },
            { token: 'support.function', foreground: '000000' },

            // Variables - Black
            { token: 'variable', foreground: '000000' },
            { token: 'variable.parameter', foreground: '000000' },
            { token: 'variable.other', foreground: '000000' },
            { token: 'entity.name.variable', foreground: '000000' },
            { token: 'variable.language', foreground: '0000ff', fontStyle: 'italic' },

            // Types & Classes - Teal
            { token: 'type', foreground: '267f99', fontStyle: 'bold' },
            { token: 'type.class', foreground: '267f99', fontStyle: 'bold' },
            { token: 'type.interface', foreground: '267f99', fontStyle: 'bold' },
            { token: 'entity.name.type', foreground: '267f99' },
            { token: 'entity.name.class', foreground: '267f99', fontStyle: 'bold' },

            // HTML Tags - Blue
            { token: 'tag', foreground: '800000', fontStyle: 'bold' },
            { token: 'tag.name', foreground: '800000', fontStyle: 'bold' },
            { token: 'entity.name.tag', foreground: '800000', fontStyle: 'bold' },
            { token: 'punctuation.definition.tag', foreground: '800000' },

            // HTML Attributes - Red
            { token: 'attribute.name', foreground: 'ff0000' },
            { token: 'entity.other.attribute-name', foreground: 'ff0000' },
            { token: 'attribute.value', foreground: '0000ff' },
            { token: 'string.quoted.double.html', foreground: '0000ff' },

            // CSS Properties - Red
            { token: 'property', foreground: 'ff0000' },
            { token: 'support.type.property-name', foreground: 'ff0000' },
            { token: 'support.type.property-name.css', foreground: '008b8b' },
            { token: 'property.value', foreground: '0000ff' },
            { token: 'selector', foreground: '800000', fontStyle: 'bold' },

            // CSS Variables - Orange Accent
            { token: 'variable.css', foreground: 'fd810d' },
            { token: 'variable.argument.css', foreground: 'ff8c00' },
            { token: 'support.function.var.css', foreground: 'ffa500' },
            { token: 'punctuation.definition.custom-property.css', foreground: 'ff7f50' },

            // Operators & Punctuation
            { token: 'operator', foreground: '000000' },
            { token: 'delimiter', foreground: '000000' },
            { token: 'punctuation', foreground: '000000' },
            { token: 'delimiter.bracket', foreground: '000000' },
            { token: 'delimiter.parenthesis', foreground: '000000' },
            { token: 'delimiter.square', foreground: '000000' },
            { token: 'delimiter.curly', foreground: '000000' },

            // Language Specific Enhancements
            // JavaScript
            { token: 'keyword.js', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'support.function.js', foreground: '000000' },
            { token: 'support.class.js', foreground: '267f99' },
            { token: 'variable.language.js', foreground: '0000ff', fontStyle: 'italic' },
            { token: 'constant.language.js', foreground: '0000ff', fontStyle: 'italic' },

            // TypeScript
            { token: 'keyword.ts', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'support.type.ts', foreground: '267f99', fontStyle: 'bold' },
            { token: 'entity.name.type.ts', foreground: '267f99' },
            { token: 'keyword.operator.type.ts', foreground: '0000ff' },

            // Python
            { token: 'keyword.python', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'support.function.builtin.python', foreground: '795e26' },
            { token: 'support.type.python', foreground: '267f99' },
            { token: 'constant.language.python', foreground: '0000ff', fontStyle: 'italic' },
            { token: 'string.quoted.docstring.python', foreground: '008000', fontStyle: 'italic' },

            // PHP
            { token: 'keyword.php', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'support.function.php', foreground: '795e26' },
            { token: 'variable.other.php', foreground: '000000' },
            { token: 'punctuation.definition.variable.php', foreground: '0000ff' },

            // Java
            { token: 'keyword.java', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'storage.type.java', foreground: '267f99', fontStyle: 'bold' },
            { token: 'storage.modifier.java', foreground: '0000ff' },
            { token: 'entity.name.type.java', foreground: '267f99' },

            // C#
            { token: 'keyword.cs', foreground: '0000ff', fontStyle: 'bold' },
            { token: 'storage.type.cs', foreground: '267f99', fontStyle: 'bold' },
            { token: 'entity.name.type.cs', foreground: '267f99' },
            { token: 'keyword.operator.cs', foreground: '0000ff' },

            // CSS Enhancements
            { token: 'support.constant.property-value.css', foreground: '0000ff' },
            { token: 'keyword.other.unit.css', foreground: '09885a' },
            { token: 'entity.other.attribute-name.pseudo-class.css', foreground: 'd7ba7d' },
            { token: 'entity.other.attribute-name.pseudo-element.css', foreground: 'd7ba7d' },

            // JSON
            { token: 'support.type.property-name.json', foreground: '0451a5' },
            { token: 'string.quoted.double.json', foreground: 'a31515' },
            { token: 'constant.numeric.json', foreground: '09885a' },
            { token: 'constant.language.json', foreground: '0000ff' },

            // Markdown
            { token: 'markup.heading.markdown', foreground: '800000', fontStyle: 'bold' },
            { token: 'markup.bold.markdown', foreground: '000000', fontStyle: 'bold' },
            { token: 'markup.italic.markdown', foreground: '000000', fontStyle: 'italic' },
            { token: 'markup.inline.raw.markdown', foreground: '09885a' },
            { token: 'markup.fenced_code.block.markdown', foreground: '000000' },
        ],
        colors: {
            // Editor background and foreground - light theme with CSS variables
            'editor.background': '#ffffff', // Light background, will be overridden by CSS
            'editor.foreground': '#000000', // Dark text, will be overridden by CSS

            // Line numbers - light theme
            'editorLineNumber.foreground': '#237893',
            'editorLineNumber.activeForeground': getCSSVariable('--vscode-focusBorder', '#fd810d'),

            // Cursor - orange accent
            'editorCursor.foreground': getCSSVariable('--vscode-focusBorder', '#fd810d'),

            // Selection - blue theme
            'editor.selectionBackground': '#add6ff80',
            'editor.selectionHighlightBackground': '#add6ff60',
            'editor.lineHighlightBackground': '#f0f0f0',
            'editor.wordHighlightBackground': '#add6ff40',
            'editor.wordHighlightStrongBackground': '#add6ff60',

            // Gutter - light theme
            'editorGutter.background': '#ffffff',

            // Focus border - orange accent
            'focusBorder': getCSSVariable('--vscode-focusBorder', '#fd810d'),

            // Widget colors - Enhanced Interface
            'editorWidget.background': '#f8f8f8', // Light background matching editor
            'editorWidget.border': '#fd810d50', // Orange border
            'editorWidget.foreground': '#000000',
            'editorWidget.resizeBorder': '#fd810d',

            // Hover widget - Orange theme
            'editorHoverWidget.background': '#f8f8f8',
            'editorHoverWidget.border': '#fd810d60',
            'editorHoverWidget.foreground': '#000000',
            'editorHoverWidget.highlightForeground': '#fd810d',
            'editorHoverWidget.statusBarBackground': '#ffffff',

            // Suggest widget - Orange theme
            'editorSuggestWidget.background': '#f8f8f8', // Light background
            'editorSuggestWidget.border': '#fd810d50', // Orange border
            'editorSuggestWidget.foreground': '#000000',
            'editorSuggestWidget.selectedBackground': '#fd810d40', // Orange selection
            'editorSuggestWidget.highlightForeground': '#fd810d', // Orange highlight
            'editorSuggestWidget.focusHighlightForeground': '#e67e22', // Darker orange focus

            // Menu colors - Enhanced Interface
            'menu.background': '#f8f8f8', // Light background matching editor
            'menu.foreground': '#000000',
            'menu.selectionBackground': '#fd810d40', // Orange selection
            'menu.selectionForeground': '#000000',
            'menu.separatorBackground': '#e9ecef',
            'menu.border': '#fd810d30',

            // Peek view colors - Orange theme
            'peekViewResult.background': '#f8f8f8', // Light background
            'peekViewResult.lineForeground': '#000000',
            'peekViewResult.fileForeground': '#fd810d', // Orange file names
            'peekViewResult.selectionBackground': '#fd810d40', // Orange selection
            'peekViewResult.selectionForeground': '#000000',
            'peekViewResult.matchHighlightBackground': '#fd810d50', // Orange highlights
            'peekViewEditor.background': '#ffffff', // Light background
            'peekViewEditor.matchHighlightBackground': '#fd810d40', // Orange match highlight
            'peekViewEditor.matchHighlightBorder': '#fd810d', // Orange border
            'peekViewEditorGutter.background': '#f8f8f8',
            'peekViewTitle.background': '#ffffff',
            'peekViewTitleDescription.foreground': '#6c757d',
            'peekViewTitleLabel.foreground': '#000000',

            // Scrollbar - light theme with orange accents
            'scrollbarSlider.background': '#c1c1c14d',
            'scrollbarSlider.hoverBackground': '#fd810d66',
            'scrollbarSlider.activeBackground': '#fd810d99',

            // Input - Orange theme
            'input.background': '#ffffff', // Light background
            'input.border': '#fd810d60', // Orange border
            'input.foreground': '#000000',
            'input.placeholderForeground': '#6c757d',
            'inputOption.activeBorder': '#fd810d',
            'inputOption.activeBackground': '#fd810d20',
            'inputValidation.infoBackground': '#f8f8f8',
            'inputValidation.infoForeground': '#fd810d', // Orange info text
            'inputValidation.infoBorder': '#fd810d',
            'inputValidation.warningBackground': '#fef3cd',
            'inputValidation.warningForeground': '#f39c12',
            'inputValidation.warningBorder': '#f39c12',
            'inputValidation.errorBackground': '#f8d7da',
            'inputValidation.errorForeground': '#e74c3c',
            'inputValidation.errorBorder': '#e74c3c',

            // Button - Orange theme
            'button.background': '#fd810d', // Orange primary button
            'button.foreground': '#ffffff',
            'button.hoverBackground': '#e67e22',
            'button.secondaryBackground': '#6c757d',
            'button.secondaryForeground': '#ffffff',
            'button.secondaryHoverBackground': '#5a6268',

            // Links - light theme
            'textLink.foreground': '#fd810d',
            'textLink.activeForeground': '#e67e22',
            'editorLink.activeForeground': '#fd810d',

            // Code lens - light theme
            'editorCodeLens.foreground': '#6c757d',

            // Additional light theme colors
            'disabledForeground': '#6c757d',
            'contrastActiveBorder': '#fd810d',
            'contrastBorder': '#e9ecef',

            // Rulers
            'editorRuler.foreground': '#dee2e6',
        }
    });

    // Define VS Code Dark Theme
    monaco.editor.defineTheme('vs-code-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            // Basic syntax highlighting for dark theme
            // Keywords - Electric Magenta
            { token: 'keyword', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'keyword.control', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'keyword.operator', foreground: 'ffee00' },
            { token: 'storage.type', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'storage.modifier', foreground: 'ae00ff' },
            { token: 'keyword.other.unit', foreground: 'ffbb00' },

            // Strings - Neon Yellow
            { token: 'string', foreground: '00FF41' },
            { token: 'string.quoted', foreground: '00FF41' },
            { token: 'string.template', foreground: '00FF41' },
            { token: 'string.regexp', foreground: '00FF41' },
            { token: 'string.interpolated', foreground: '00FF41' },

            // Comments - Gray
            { token: 'comment', foreground: '858585', fontStyle: 'italic' },
            { token: 'comment.line', foreground: '858585', fontStyle: 'italic' },
            { token: 'comment.block', foreground: '858585', fontStyle: 'italic' },
            { token: 'comment.documentation', foreground: '858585', fontStyle: 'italic' },

            // Numbers - Bright Orange
            { token: 'number', foreground: 'ffbb00' },
            { token: 'number.hex', foreground: 'ffbb00' },
            { token: 'number.float', foreground: 'ffbb00' },
            { token: 'constant.numeric', foreground: 'ffbb00' },
            { token: 'constant.character.numeric', foreground: 'ffbb00' },

            // Functions - Electric Blue
            { token: 'function', foreground: '0080FF', fontStyle: 'bold' },
            { token: 'function.call', foreground: '0080FF' },
            { token: 'method', foreground: '0080FF' },
            { token: 'entity.name.function', foreground: '0080FF', fontStyle: 'bold' },
            { token: 'support.function', foreground: '0080FF' },

            // Variables - Bright Yellow
            { token: 'variable', foreground: 'FFFF00' },
            { token: 'variable.parameter', foreground: 'FFFF00' },
            { token: 'variable.other', foreground: 'FFFF00' },
            { token: 'entity.name.variable', foreground: 'FFFF00' },
            { token: 'variable.language', foreground: 'FFFF00', fontStyle: 'italic' },

            // Types & Classes - Purple
            { token: 'type', foreground: 'ae00ff', fontStyle: 'bold' },
            { token: 'type.class', foreground: 'ae00ff', fontStyle: 'bold' },
            { token: 'type.interface', foreground: 'ae00ff', fontStyle: 'bold' },
            { token: 'entity.name.type', foreground: 'ae00ff' },
            { token: 'entity.name.class', foreground: 'ae00ff', fontStyle: 'bold' },

            // HTML Tags - Primary Orange
            { token: 'tag', foreground: '0099ff', fontStyle: 'bold' },
            { token: 'tag.name', foreground: 'fd810d', fontStyle: 'bold' },
            { token: 'entity.name.tag', foreground: 'fd810d', fontStyle: 'bold' },
            { token: 'punctuation.definition.tag', foreground: 'fd810d' },
            { token: 'punctuation.definition.tag.begin.html', foreground: 'fd810d' },
            { token: 'punctuation.definition.tag.end.html', foreground: 'fd810d' },
            { token: 'meta.tag.html', foreground: 'fd810d' },
            { token: 'meta.tag.structure.html', foreground: 'fd810d', fontStyle: 'bold' },
            { token: 'meta.tag.metadata.html', foreground: 'fd810d', fontStyle: 'bold' },

            // HTML Attributes - Neon Yellow
            { token: 'attribute.name', foreground: 'ffee00' },
            { token: 'entity.other.attribute-name', foreground: 'ffee00' },
            { token: 'entity.other.attribute-name.html', foreground: 'ffee00' },
            { token: 'entity.other.attribute-name.id.html', foreground: 'ffee00', fontStyle: 'bold' },
            { token: 'entity.other.attribute-name.class.html', foreground: 'ffee00', fontStyle: 'bold' },
            { token: 'attribute.value', foreground: '00ff88' },
            { token: 'string.quoted.double.html', foreground: '00ff88' },
            { token: 'string.quoted.single.html', foreground: '00ff88' },
            { token: 'punctuation.definition.string.begin.html', foreground: '00ff88' },
            { token: 'punctuation.definition.string.end.html', foreground: '00ff88' },

            // HTML Doctype & Special Elements
            { token: 'meta.tag.sgml.doctype.html', foreground: 'ae00ff', fontStyle: 'italic' },
            { token: 'punctuation.definition.tag.html', foreground: 'fd810d' },
            { token: 'entity.name.tag.script.html', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'entity.name.tag.style.html', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'text.html.basic', foreground: 'ffffff' },

            // CSS Properties - Lime Green
            { token: 'property', foreground: '00ff88' },
            { token: 'support.type.property-name', foreground: '32CD32' },
            { token: 'support.type.property-name.css', foreground: '32CD32' },
            { token: 'property.value', foreground: 'FFFF00' },
            { token: 'selector', foreground: '0099ff', fontStyle: 'bold' },

            // CSS Variables - Orange Accent
            { token: 'variable.css', foreground: 'ffbb00' },
            { token: 'variable.argument.css', foreground: 'ffbb00' },
            { token: 'support.function.var.css', foreground: 'ffbb00' },
            { token: 'punctuation.definition.custom-property.css', foreground: 'ffbb00' },

            // Operators & Punctuation - Neon Yellow
            { token: 'operator', foreground: 'ffee00' },
            { token: 'delimiter', foreground: 'ffee00' },
            { token: 'punctuation', foreground: 'ffee00' },
            { token: 'delimiter.bracket', foreground: 'ffee00' },
            { token: 'delimiter.parenthesis', foreground: 'ffee00' },
            { token: 'delimiter.square', foreground: 'ffee00' },
            { token: 'delimiter.curly', foreground: 'ffee00' },

            // JavaScript Specific Tokens (poprawione kolory jak na screenshocie)
            { token: 'keyword.control.js', foreground: 'FFFF00', fontStyle: 'bold' },
            { token: 'keyword.operator.js', foreground: 'ffee00' },
            { token: 'keyword.operator.new.js', foreground: 'FFFF00', fontStyle: 'bold' },
            { token: 'storage.type.js', foreground: 'FFFF00', fontStyle: 'bold' },
            { token: 'storage.modifier.js', foreground: 'FFFF00' },
            { token: 'support.constant.js', foreground: 'FFFF00', fontStyle: 'italic' },
            { token: 'support.variable.js', foreground: 'FFFFFF' },
            { token: 'support.variable.property.js', foreground: 'FFFFFF' },
            { token: 'meta.function.js', foreground: '00FFFF' },
            { token: 'entity.name.function.js', foreground: '00FFFF', fontStyle: 'bold' },
            { token: 'variable.parameter.js', foreground: 'FFFF00' },
            { token: 'punctuation.definition.parameters.js', foreground: 'ffee00' },
            { token: 'meta.brace.curly.js', foreground: '00FFFF' },
            { token: 'meta.brace.square.js', foreground: 'ffee00' },
            { token: 'meta.brace.round.js', foreground: 'ffee00' },
            { token: 'punctuation.terminator.statement.js', foreground: 'ffee00' },
            { token: 'punctuation.separator.comma.js', foreground: 'ffee00' },
            { token: 'punctuation.accessor.js', foreground: 'ffee00' },
            { token: 'constant.other.object.key.js', foreground: 'FFFF00' },
            { token: 'string.template.js', foreground: 'ffee00' },
            { token: 'punctuation.definition.template-expression.js', foreground: 'FF00FF' },
            { token: 'keyword.operator.spread.js', foreground: 'FF00FF' },
            { token: 'keyword.operator.rest.js', foreground: 'FF00FF' },
            { token: 'support.class.promise.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'support.function.console.js', foreground: '00FFFF' },
            { token: 'support.variable.dom.js', foreground: 'FF00FF' },
            { token: 'entity.name.type.module.js', foreground: 'FF00FF' },
            { token: 'keyword.control.import.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'keyword.control.export.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'keyword.control.from.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'keyword.control.as.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'keyword.control.default.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'meta.object-literal.key.js', foreground: 'FFFF00' },
            { token: 'punctuation.separator.key-value.js', foreground: 'ffee00' },
            { token: 'support.type.object.module.js', foreground: 'FF00FF' },
            { token: 'variable.other.readwrite.js', foreground: 'FFFF00' },
            { token: 'variable.other.constant.js', foreground: 'FFFF00', fontStyle: 'italic' },
            { token: 'entity.name.type.class.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'storage.type.class.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'storage.type.function.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'storage.type.function.arrow.js', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'keyword.operator.assignment.js', foreground: 'ffee00' },
            { token: 'keyword.operator.comparison.js', foreground: 'ffee00' },
            { token: 'keyword.operator.logical.js', foreground: 'ffee00' },
            { token: 'keyword.operator.arithmetic.js', foreground: 'E74C3C' },
            { token: 'punctuation.definition.string.template.js', foreground: 'ffee00' },
            { token: 'meta.embedded.expression.js', foreground: 'FFFF00' },
            { token: 'constant.numeric.js', foreground: 'ffbb00' },

            // Language Specific Enhancements
            // TypeScript
            { token: 'keyword.ts', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'support.type.ts', foreground: 'ae00ff', fontStyle: 'bold' },
            { token: 'entity.name.type.ts', foreground: 'ae00ff' },
            { token: 'keyword.operator.type.ts', foreground: 'ffee00' },

            // Python
            { token: 'keyword.python', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'support.function.builtin.python', foreground: '0080FF' },
            { token: 'support.type.python', foreground: 'ae00ff' },
            { token: 'constant.language.python', foreground: 'ffbb00', fontStyle: 'italic' },
            { token: 'string.quoted.docstring.python', foreground: '858585', fontStyle: 'italic' },

            // PHP
            { token: 'keyword.php', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'support.function.php', foreground: '0080FF' },
            { token: 'variable.other.php', foreground: 'FFFF00' },
            { token: 'punctuation.definition.variable.php', foreground: 'FF00FF' },

            // Java
            { token: 'keyword.java', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'storage.type.java', foreground: 'ae00ff', fontStyle: 'bold' },
            { token: 'storage.modifier.java', foreground: 'ae00ff' },
            { token: 'entity.name.type.java', foreground: 'ae00ff' },

            // C#
            { token: 'keyword.cs', foreground: 'FF00FF', fontStyle: 'bold' },
            { token: 'storage.type.cs', foreground: 'ae00ff', fontStyle: 'bold' },
            { token: 'entity.name.type.cs', foreground: 'ae00ff' },
            { token: 'keyword.operator.cs', foreground: 'ffee00' },

            // CSS Enhancements
            { token: 'support.constant.property-value.css', foreground: 'FFFF00' },
            { token: 'keyword.other.unit.css', foreground: 'ffbb00' },
            { token: 'entity.other.attribute-name.pseudo-class.css', foreground: 'FF00FF' },
            { token: 'entity.other.attribute-name.pseudo-element.css', foreground: '0099ff' },

            // JSON
            { token: 'support.type.property-name.json', foreground: '32CD32' },
            { token: 'string.quoted.double.json', foreground: 'ffee00' },
            { token: 'constant.numeric.json', foreground: 'ffbb00' },
            { token: 'constant.language.json', foreground: 'FF00FF' },

            // Markdown
            { token: 'markup.heading.markdown', foreground: '0099ff', fontStyle: 'bold' },
            { token: 'markup.bold.markdown', foreground: 'ffbb00', fontStyle: 'bold' },
            { token: 'markup.italic.markdown', foreground: '0080FF', fontStyle: 'italic' },
            { token: 'markup.inline.raw.markdown', foreground: 'ffee00' },
            { token: 'markup.fenced_code.block.markdown', foreground: 'ffee00' },
        ],
        colors: {
            // Editor background and foreground - dark theme with CSS variables
            'editor.background': '#1a1a1a', // Dark background using CSS variable
            'editor.foreground': '#ffffff', // Light text using CSS variable

            // Line numbers - dark theme
            'editorLineNumber.foreground': '#6c757d',
            'editorLineNumber.activeForeground': '#fd810d',

            // Cursor - orange accent
            'editorCursor.foreground': '#fd810d',

            // Selection - orange theme
            // Selection & Highlighting - Enhanced Interface Colors
            'editor.selectionBackground': '#fd810d40', // Orange selection with transparency
            'editor.selectionHighlightBackground': '#fd810d25', // Light orange highlight
            'editor.lineHighlightBackground': '#414141', // Subtle dark highlight using tertiary color   
            'editor.wordHighlightBackground': '#fd810d25', // Light orange word highlight
            'editor.wordHighlightStrongBackground': '#fd810d40', // Stronger orange highlight

            // Gutter - dark theme
            'editorGutter.background': '#1a1a1a',

            // Focus border - orange accent
            'focusBorder': '#fd810d',

            // Widget colors - Enhanced Interface
            'editorWidget.background': '#1a1a1a', // Dark background matching editor
            'editorWidget.border': '#36363673', // Border using CSS variable
            'editorWidget.foreground': '#ffffff',
            'editorWidget.resizeBorder': '#fd810d',

            // Hover widget - Orange theme
            'editorHoverWidget.background': '#1a1a1a',
            'editorHoverWidget.border': '#36363673',
            'editorHoverWidget.foreground': '#ffffff',
            'editorHoverWidget.highlightForeground': '#fd810d',
            'editorHoverWidget.statusBarBackground': '#222',

            // Suggest widget - Orange theme
            'editorSuggestWidget.background': '#1a1a1a', // Dark background
            'editorSuggestWidget.border': '#36363673', // Border using CSS variable
            'editorSuggestWidget.foreground': '#ffffff',
            'editorSuggestWidget.selectedBackground': '#fd810d40', // Orange selection
            'editorSuggestWidget.highlightForeground': '#fd810d', // Orange highlight
            'editorSuggestWidget.focusHighlightForeground': '#fd810d', // Orange focus

            // Menu colors - Enhanced Interface
            'menu.background': '#1f1f1f', // Dark background matching editor
            'menu.foreground': '#8a8a8a',
            'menu.selectionBackground': '#5050505e', // Orange selection
            'menu.selectionForeground': '#ff9100',
            'menu.separatorBackground': '#36363673',
            'menu.border': '#36363673',

            // Peek view colors - Orange theme
            'peekViewResult.background': '#1a1a1a', // Dark background
            'peekViewResult.lineForeground': '#ffffff',
            'peekViewResult.fileForeground': '#fd810d', // Orange file names
            'peekViewResult.selectionBackground': '#fd810d40', // Orange selection
            'peekViewResult.selectionForeground': '#ffffff',
            'peekViewResult.matchHighlightBackground': '#fd810d50', // Orange highlights
            'peekViewEditor.background': '#222', // Darker background using quinary color
            'peekViewEditor.matchHighlightBackground': '#fd810d40', // Orange match highlight
            'peekViewEditor.matchHighlightBorder': '#fd810d', // Orange border
            'peekViewEditorGutter.background': '#1a1a1a',
            'peekViewTitle.background': '#222',
            'peekViewTitleDescription.foreground': '#7c7c7c',
            'peekViewTitleLabel.foreground': '#ffffff',

            // Scrollbar - dark theme with orange accents
            'scrollbarSlider.background': '#2c2c2c4d',
            'scrollbarSlider.hoverBackground': '#2c2c2c66',
            'scrollbarSlider.activeBackground': '#27272799',

            // Input - Orange theme
            'input.background': '#1a1a1a', // Dark background
            'input.border': '#36363673', // Border using CSS variable
            'input.foreground': '#ffffff',
            'input.placeholderForeground': '#7c7c7c',
            'inputOption.activeBorder': '#fd810d',
            'inputOption.activeBackground': '#fd810d20',
            'inputValidation.infoBackground': '#1a1a1a',
            'inputValidation.infoForeground': '#fd810d', // Orange info text
            'inputValidation.infoBorder': '#fd810d',
            'inputValidation.warningBackground': '#2d1f0d',
            'inputValidation.warningForeground': '#f39c12',
            'inputValidation.warningBorder': '#f39c12',
            'inputValidation.errorBackground': '#2d1b1b',
            'inputValidation.errorForeground': '#e74c3c',
            'inputValidation.errorBorder': '#e74c3c',

            // Button - Orange theme
            'button.background': '#fd810d', // Orange primary button
            'button.foreground': '#ffffff',
            'button.hoverBackground': '#e67e22',
            'button.secondaryBackground': '#414141',
            'button.secondaryForeground': '#ffffff',
            'button.secondaryHoverBackground': '#7c7c7c',

            // Links - dark theme
            'textLink.foreground': '#fd810d',
            'textLink.activeForeground': '#e67e22',
            'editorLink.activeForeground': '#fd810d',

            // Code lens - dark theme
            'editorCodeLens.foreground': '#7c7c7c',

            // Additional dark theme colors
            'disabledForeground': '#7c7c7c',
            'contrastActiveBorder': '#fd810d23',
            'contrastBorder': '#36363673',

            // Core Editor Colors
            'editor.background': '#161616',
            'editor.foreground': '#ffffff',
            'editorLineNumber.foreground': '#7c7c7c',
            'editorLineNumber.activeForeground': '#fd810d',

            // Selection & Highlighting - Improved Contrast
            'editor.selectionBackground': '#fd810d40',
            'editor.selectionHighlightBackground': '#fd810d30',
            'editor.lineHighlightBackground': '#414141',
            'editor.wordHighlightBackground': '#fd810d20',
            'editor.wordHighlightStrongBackground': '#fd810d35',

            // Cursor & Find - Enhanced with keyboard shortcuts highlighting
            'editorCursor.foreground': '#fd810d',
            'editor.findMatchBackground': '#fd810d60', // Ctrl+F search matches
            'editor.findMatchHighlightBackground': '#fd810d30', // Ctrl+F highlight
            'editor.findRangeHighlightBackground': '#fd810d20', // Ctrl+F range
            'editor.findMatchBorder': '#ffff00', // Bright border for active search match (Ctrl+F)
            'editor.findRangeHighlightBorder': '#fd810d80', // Search range border (Ctrl+F)

            // Keyboard shortcuts highlighting - Special colors for shortcut-triggered actions
            'editor.selectionBackground': '#fd810d40', // Ctrl+A, Shift+Arrow selection
            'editor.wordHighlightBackground': '#fd810d20', // Ctrl+D word selection
            'editor.wordHighlightStrongBackground': '#fd810d35', // Ctrl+Shift+L all occurrences
            'editor.lineHighlightBackground': '#414141', // Current line (cursor position)

            // Comment toggle highlighting - Ctrl+/
            'editor.commentHighlightBackground': '#00ff4120', // Green tint for comment operations
            'editor.commentHighlightBorder': '#00ff41', // Green border for comment toggle

            // Indentation shortcuts - Tab/Shift+Tab
            'editorIndentGuide.background': '#414141', // Tab indentation guides
            'editorIndentGuide.activeBackground': '#fd810d', // Active indent guide (Tab/Shift+Tab)

            // Cut/Copy/Paste highlighting - Ctrl+X/C/V
            'editor.clipboardHighlightBackground': '#ffff0030', // Yellow tint for clipboard operations
            'editor.clipboardHighlightBorder': '#ffff00', // Yellow border for cut/copy/paste

            // Bracket Pair Colorization - Enhanced Rainbow
            'editorBracketHighlight.foreground1': '#FF00FF',
            'editorBracketHighlight.foreground2': '#00ffff',
            'editorBracketHighlight.foreground3': '#00ff88',
            'editorBracketHighlight.foreground4': '#FFFF00',
            'editorBracketHighlight.foreground5': '#0099ff',
            'editorBracketHighlight.foreground6': '#ae00ff',
            'editorBracketHighlight.unexpectedBracket.foreground': '#ff0000',

            // Minimap - Enhanced Visibility
            'minimap.background': '#1a1a1a',
            'minimap.selectionHighlight': '#fd810d',
            'minimap.findMatchHighlight': '#fd810d',
            'minimap.errorHighlight': '#ff5555',
            'minimap.warningHighlight': '#fd810d',
            'minimap.foregroundOpacity': '#ffffffcc',

            // Scrollbar - Cyberpunk Style
            'scrollbarSlider.background': '#29292950',
            'scrollbarSlider.hoverBackground': '#94949460',
            'scrollbarSlider.activeBackground': '#303030',

            // Gutter & Margins
            'editorGutter.background': '#222',
            'editorGutter.modifiedBackground': '#fd810d',
            'editorGutter.addedBackground': '#00ff88',
            'editorGutter.deletedBackground': '#ff5555',

            // Overview Ruler
            'editorOverviewRuler.background': '#1a1a1a',
            'editorOverviewRuler.selectionHighlightForeground': '#fd810d',
            'editorOverviewRuler.findMatchForeground': '#fd810d',
            'editorOverviewRuler.errorForeground': '#ff5555',
            'editorOverviewRuler.warningForeground': '#fd810d',

            // Widget Colors
            'editorWidget.background': '#1a1a1a',
            'editorWidget.border': '#fd810d',
            'editorWidget.foreground': '#ffffff',

            // Suggest Widget - Enhanced for Ctrl+Space
            'editorSuggestWidget.background': '#1a1a1a',
            'editorSuggestWidget.border': '#fd810d',
            'editorSuggestWidget.foreground': '#ffffff',
            'editorSuggestWidget.selectedBackground': '#fd810d30', // Ctrl+Space selection
            'editorSuggestWidget.highlightForeground': '#fd810d', // Ctrl+Space highlight
            'editorSuggestWidget.selectedForeground': '#ffffff', // Selected suggestion text

            // Hover Widget
            'editorHoverWidget.background': '#1a1a1a',
            'editorHoverWidget.border': '#fd810d2a',
            'editorHoverWidget.foreground': '#ffffff',

            // Error & Warning Squiggles
            'editorError.foreground': '#ff5555',
            'editorWarning.foreground': '#fd810d',
            'editorInfo.foreground': '#fd810d',

            // Indent Guides - Enhanced for Tab navigation
            'editorIndentGuide.background': '#414141',
            'editorIndentGuide.activeBackground': '#fd810d', // Active when using Tab/Shift+Tab

            // Rulers
            'editorRuler.foreground': '#414141',
        }
    });

    if (VS_CODE_THEME_CONFIG.verboseLogging) {
        console.log('🎨 VS Code Light and Dark themes defined successfully');
    }
}

// --- Enhanced Dragan Theme ---
function updateInterfaceColors() {
    console.log('🎨 Updating interface colors for better UI experience...');

    // Update Dragan theme with enhanced interface colors
    monaco.editor.defineTheme('dragan-enhanced', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            // Keep existing syntax highlighting
            { token: 'keyword', foreground: 'ff00ff', fontStyle: 'bold' },
            { token: 'string', foreground: '00ff41' },
            { token: 'comment', foreground: '00ffff', fontStyle: 'italic' },
            { token: 'number', foreground: 'ff8c00' },
            { token: 'function', foreground: '0080ff', fontStyle: 'bold' },
            { token: 'variable', foreground: 'ffff00' },
            { token: 'type', foreground: '8000ff', fontStyle: 'bold' },
            { token: 'tag', foreground: 'ff1493', fontStyle: 'bold' },
            { token: 'attribute.name', foreground: '32cd32' },
            { token: 'operator', foreground: 'ff4500' },
        ],
        colors: {
            // Core Editor - Enhanced
            'editor.background': '#0d0d0d',
            'editor.foreground': '#f8f8f2',
            'editorLineNumber.foreground': '#888888',
            'editorLineNumber.activeForeground': '#ffb875',

            // Selection & Highlighting - Improved Contrast
            'editor.selectionBackground': '#ff910040',
            'editor.selectionHighlightBackground': '#ff910030',
            'editor.lineHighlightBackground': '#1a1a1a',
            'editor.wordHighlightBackground': '#ff910020',
            'editor.wordHighlightStrongBackground': '#ff910035',

            // Cursor & Find
            'editorCursor.foreground': '#ff9900',
            'editor.findMatchBackground': '#ffbf7560',
            'editor.findMatchHighlightBackground': '#ffbf7530',
            'editor.findRangeHighlightBackground': '#ff910020',

            // Bracket colors - VS Code integration
            'editorBracketHighlight.foreground1': '#FF75B5',
            'editorBracketHighlight.foreground2': '#45A9F9',
            'editorBracketHighlight.foreground3': '#924cee',
            'editorBracketHighlight.foreground4': '#46fc55',
            'editorBracketHighlight.foreground5': '#FFB86C',
            'editorBracketHighlight.foreground6': '#F39C12',
            'editorBracketHighlight.unexpectedBracket.foreground': '#FF2C6D',

            // Widget colors - Enhanced Interface
            'editorWidget.background': '#1a1a1a', // Dark background matching editor
            'editorWidget.border': '#fd810d50', // Orange border
            'editorWidget.foreground': '#ffffff',
            'editorWidget.resizeBorder': '#fd810d',

            // Hover widget - Orange theme
            'editorHoverWidget.background': '#1a1a1a',
            'editorHoverWidget.border': '#fd810d60',
            'editorHoverWidget.foreground': '#ffffff',
            'editorHoverWidget.highlightForeground': '#fd810d',
            'editorHoverWidget.statusBarBackground': '#0d0d0d',

            // Suggest widget - Orange theme
            'editorSuggestWidget.background': '#1a1a1a', // Dark background
            'editorSuggestWidget.border': '#fd810d50', // Orange border
            'editorSuggestWidget.foreground': '#ffffff',
            'editorSuggestWidget.selectedBackground': '#fd810d40', // Orange selection
            'editorSuggestWidget.highlightForeground': '#fd810d', // Orange highlight
            'editorSuggestWidget.focusHighlightForeground': '#ff8c00', // Lighter orange focus

            // Menu colors - Enhanced Interface
            'menu.background': '#1a1a1a', // Dark background matching editor
            'menu.foreground': '#ffffff',
            'menu.selectionBackground': '#fd810d40', // Orange selection
            'menu.selectionForeground': '#ffffff',
            'menu.separatorBackground': '#343a40',
            'menu.border': '#fd810d30',

            // Input - Orange theme
            'input.background': '#0d0d0d', // Dark background
            'input.border': '#fd810d60', // Orange border
            'input.foreground': '#ffffff',
            'input.placeholderForeground': '#adb5bd',
            'inputOption.activeBorder': '#fd810d',
            'inputOption.activeBackground': '#fd810d20',

            // Button - Orange theme
            'button.background': '#fd810d', // Orange primary button
            'button.foreground': '#ffffff',
            'button.hoverBackground': '#e67e22',
            'button.secondaryBackground': '#343a40',
            'button.secondaryForeground': '#ffffff',
            'button.secondaryHoverBackground': '#495057',

            // Minimap
            'minimap.background': '#1e1e1e',
            'minimap.selectionHighlight': '#ff9900',
            'minimap.findMatchHighlight': '#fd810d',

            // Scrollbar - dark theme with orange accents
            'scrollbarSlider.background': '#6c757d4d',
            'scrollbarSlider.hoverBackground': '#fd810d66',
            'scrollbarSlider.activeBackground': '#fd810d99',
        }
    });

    console.log('✅ Enhanced interface colors applied');
}

// --- Theme Management Functions ---
function refreshVSCodeThemes() {
    if (!window.editor) return;

    if (VS_CODE_THEME_CONFIG.verboseLogging) {
        console.log('🔄 Refreshing VS Code themes with updated CSS variables...');
    }

    // Redefine themes with current CSS variable values
    defineVSCodeThemes();

    // Get current theme and reapply it
    const currentTheme = window.getCurrentTheme();
    const customTheme = localStorage.getItem('monaco_custom_theme');

    if (customTheme !== 'dragan') {
        // Only refresh if not using Dragan theme
        const monacoTheme = currentTheme === 'dark' ? 'vs-code-dark' : 'vs-code-light';
        monaco.editor.setTheme(monacoTheme);

        if (VS_CODE_THEME_CONFIG.verboseLogging) {
            console.log(`🎨 VS Code theme refreshed: ${monacoTheme}`);
        }
    }
}

function setupCSSVariableObserver() {
    if (!window.editor) return;

    if (VS_CODE_THEME_CONFIG.verboseLogging) {
        console.log('🔍 Setting up CSS variable observer for VS Code themes...');
    }

    // Create a MutationObserver to watch for theme attribute changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'theme') {
                const newTheme = document.documentElement.getAttribute('theme');
                if (VS_CODE_THEME_CONFIG.verboseLogging) {
                    console.log(`🔄 Theme changed to: ${newTheme}, refreshing VS Code themes...`);
                }

                // Small delay to ensure CSS variables are updated
                setTimeout(() => {
                    refreshVSCodeThemes();
                }, 50);
            }
        });
    });

    // Start observing theme changes
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['theme']
    });

    // Also setup periodic refresh for CSS variable changes (if enabled)
    if (VS_CODE_THEME_CONFIG.enablePeriodicRefresh) {
        let lastVariableCheck = '';
        setInterval(() => {
            // Check if primary color variable has changed
            const currentPrimaryColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--vscode-focusBorder').trim();

            if (currentPrimaryColor && currentPrimaryColor !== lastVariableCheck) {
                lastVariableCheck = currentPrimaryColor;
                if (VS_CODE_THEME_CONFIG.verboseLogging) {
                    console.log('🎨 CSS variables changed, refreshing VS Code themes...');
                }
                refreshVSCodeThemes();
            }
        }, VS_CODE_THEME_CONFIG.refreshInterval);
    }

    if (VS_CODE_THEME_CONFIG.verboseLogging) {
        console.log('✅ CSS variable observer setup completed');
    }
}

function toggleVSCodeThemeLogging(enable = null) {
    if (enable === null) {
        VS_CODE_THEME_CONFIG.verboseLogging = !VS_CODE_THEME_CONFIG.verboseLogging;
    } else {
        VS_CODE_THEME_CONFIG.verboseLogging = enable;
    }

    const status = VS_CODE_THEME_CONFIG.verboseLogging ? 'enabled' : 'disabled';
    console.log(`🔧 VS Code theme verbose logging ${status}`);

    if (typeof window.updateFooterStatus === 'function') {
        window.updateFooterStatus(`VS Code logging ${status}`, 'cog');
        setTimeout(() => window.updateFooterStatus('Ready', 'circle'), 1000);
    }

    return VS_CODE_THEME_CONFIG.verboseLogging;
}

// Apply enhanced interface colors
function applyEnhancedInterface() {
    updateInterfaceColors();
    monaco.editor.setTheme('dragan-enhanced');
    applyEnhancedInterfaceMenuStyling(); // Apply border-radius: 0 to all menus
    if (typeof window.showFooterStatus === 'function') {
        window.showFooterStatus('🎨 Enhanced interface with border-radius: 0 applied', 'success');
    }
}

// --- Enhanced Interface Menu Styling ---
function applyEnhancedInterfaceMenuStyling() {
    // Add CSS for enhanced interface menus with border-radius: 0
    const style = document.createElement('style');
    style.id = 'enhanced-interface-menu-styles';
    style.textContent = `
        /* Enhanced Interface Menu Styling - Border Radius 0 */
        .monaco-menu,
        .monaco-menu .monaco-menu-container,
        .monaco-menu .monaco-action-bar,
        .monaco-menu .action-item,
        .monaco-menu .action-label,
        .context-view .monaco-menu,
        .context-view .monaco-menu-container,
        .monaco-dropdown-with-primary,
        .monaco-dropdown-with-default,
        .monaco-suggest-widget,
        .monaco-hover,
        .monaco-hover .hover-contents,
        .monaco-parameter-hints-widget,
        .monaco-editor-hover,
        .monaco-editor-hover .hover-contents,
        .quick-input-widget,
        .quick-input-header,
        .quick-input-list,
        .quick-input-list-entry,
        .monaco-list,
        .monaco-list-row,
        .monaco-scrollable-element,
        .monaco-action-bar .action-item.menu-entry .action-label,
        .monaco-toolbar .monaco-action-bar .action-item,
        .monaco-workbench .part > .title .title-actions .action-item,
        .monaco-keybinding,
        .monaco-button,
        .monaco-inputbox,
        .monaco-select-box,
        .monaco-findInput,
        .monaco-count-badge {
            border-radius: 0 !important;
        }
        
        /* Specific enhanced interface elements */
        .enhanced-interface .monaco-menu,
        .enhanced-interface .context-view,
        .enhanced-interface .monaco-dropdown,
        .enhanced-interface .monaco-suggest-widget,
        .enhanced-interface .monaco-hover {
            border-radius: 0 !important;
        }
        
        /* Override any existing border-radius in Monaco components */
        .monaco-editor .suggest-widget,
        .monaco-editor .parameter-hints-widget,
        .monaco-editor .editor-hover-contents,
        .monaco-editor .monaco-hover .hover-contents {
            border-radius: 0 !important;
        }
    `;

    // Remove existing style if it exists
    const existingStyle = document.getElementById('enhanced-interface-menu-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Add new style
    document.head.appendChild(style);

    console.log('🎨 Enhanced interface menu styling applied - border-radius: 0');
}

// Apply styling when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        applyEnhancedInterfaceMenuStyling();
        applyBracketPairGuidesStyling();
    });
} else {
    applyEnhancedInterfaceMenuStyling();
    applyBracketPairGuidesStyling();
}

// --- Enhanced Bracket Pair Guides Styling ---
function applyBracketPairGuidesStyling() {
    const style = document.createElement('style');
    style.id = 'enhanced-bracket-guides-styles';
    style.textContent = `
        /* Enhanced Bracket Pair Guides */
        .monaco-editor .bracket-guide {
            opacity: 0.8 !important;
            border-width: 1px !important;
        }
        
        /* Bracket pair colorization for curly braces {} */
        .monaco-editor .bracket-pair-guide-0 {
            border-color: #00ffff !important; /* Cyan for {} */
        }
        
        .monaco-editor .bracket-pair-guide-1 {
            border-color: #ff6347 !important; /* Orange for [] */
        }
        
        .monaco-editor .bracket-pair-guide-2 {
            border-color: #ff00ff !important; /* Magenta for () */
        }
        
        /* Active bracket pair highlighting */
        .monaco-editor .bracket-pair-guide.active {
            border-width: 2px !important;
            opacity: 1 !important;
            animation: bracketPulse 1s ease-in-out infinite alternate;
        }
        
        /* Bracket matching animation */
        @keyframes bracketPulse {
            from { 
                opacity: 0.8; 
                border-width: 1px;
            }
            to { 
                opacity: 1; 
                border-width: 2px;
                box-shadow: 0 0 3px currentColor;
            }
        }
        
        /* Enhanced bracket highlighting in Dragan theme */
        .monaco-editor[data-theme="dragan"] .bracket-pair-guide-0 {
            border-color: #00ced1 !important; /* Bright cyan for {} */
            box-shadow: 0 0 2px #00ced1;
        }
        
        .monaco-editor[data-theme="dragan"] .bracket-pair-guide-1 {
            border-color: #ffd700 !important; /* Gold for [] */
            box-shadow: 0 0 2px #ffd700;
        }
        
        .monaco-editor[data-theme="dragan"] .bracket-pair-guide-2 {
            border-color: #ff00ff !important; /* Magenta for () */
            box-shadow: 0 0 2px #ff00ff;
        }
        
        /* Bracket matching in code */
        .monaco-editor .bracket-match {
            background: rgba(0, 255, 255, 0.2) !important;
            border: 1px solid #00ffff !important;
            border-radius: 2px !important;
        }
        
        /* Indent guides enhancement */
        .monaco-editor .indent-guide {
            border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .monaco-editor .indent-guide.active {
            border-left: 1px solid rgba(0, 255, 255, 0.5) !important;
        }
    `;

    // Remove existing style if it exists
    const existingStyle = document.getElementById('enhanced-bracket-guides-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Add new style
    document.head.appendChild(style);

    console.log('🎨 Enhanced bracket pair guides styling applied');
}

// --- Export functions to global scope ---
window.defineDraganTheme = defineDraganTheme;
window.defineVSCodeThemes = defineVSCodeThemes;
window.updateInterfaceColors = updateInterfaceColors;
window.refreshVSCodeThemes = refreshVSCodeThemes;
window.setupCSSVariableObserver = setupCSSVariableObserver;
window.toggleVSCodeThemeLogging = toggleVSCodeThemeLogging;
window.applyEnhancedInterface = applyEnhancedInterface;
window.applyEnhancedInterfaceMenuStyling = applyEnhancedInterfaceMenuStyling;
window.applyBracketPairGuidesStyling = applyBracketPairGuidesStyling;
window.VS_CODE_THEME_CONFIG = VS_CODE_THEME_CONFIG;

console.log('🎨 Monaco Style definitions loaded successfully');
