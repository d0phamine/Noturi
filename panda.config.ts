import { defineConfig } from "@pandacss/dev"

import { semanticTokens, themeTokens } from "./src/styles/tokens"

export default defineConfig({
	preflight: true,
	include: ["./src/**/*.{js,jsx,ts,tsx}"],
	exclude: [],
	jsxFramework: "react",
	outdir: "src/styles/panda",
	conditions: {
		dark: "@media (prefers-color-scheme: dark)",
	},

	theme: {
		extend: {
			tokens: themeTokens,
			semanticTokens: semanticTokens
		}
	},
	
})

