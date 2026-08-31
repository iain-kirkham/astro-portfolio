import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	// Light first (the default), dark applied under the .dark class that the
	// theme toggle sets on <html>.
	themes: ["catppuccin-latte", "catppuccin-macchiato"],
	// Selectors are appended to themeCssRoot (":root"). Returning false makes
	// the light theme the default; the dark one applies under :root.dark.
	themeCssSelector: (theme) =>
		theme.name === "catppuccin-macchiato" ? ".dark" : false,
	// The class on <html> is the source of truth, not the OS preference.
	useDarkModeMediaQuery: false,
	ignoredLanguages: ["mermaid"],
	wrap: true,
	preserveIndent: true,
	styleOverrides: {
		borderRadius: "0.75rem",
		borderColor: "var(--c-border)",
		codeFontFamily: "var(--font-mono)",
		uiFontFamily: "var(--font-mono)",
		frames: {
			shadowColor: "transparent",
		},
	},
});
