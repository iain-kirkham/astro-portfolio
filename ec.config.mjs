import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	// You can set configuration options here
	themes: ["catppuccin-macchiato"],
	wrap: true,
	preserveIndent: true,
	styleOverrides: {
		// You can also override styles
		borderRadius: "0.3rem",
		frames: {
			shadowColor: "#124",
		},
	},
});
