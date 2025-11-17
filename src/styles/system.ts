import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

import { semanticTokens, themeTokens } from "@/styles/tokens"

const customConfig = defineConfig({
	theme: {
		tokens: themeTokens,
		semanticTokens: semanticTokens
	}
})

export const system = createSystem(defaultConfig, customConfig)

