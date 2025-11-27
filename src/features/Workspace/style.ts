import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const workspaceRecipe = cva({
	base: {
		height: "100%",
        
		overflow: "hidden",
		display: "grid",
		gridTemplateRows: "{spacing.9} 1fr {spacing.6}"
	}
})

export const workspaceHeaderRecipe = cva({
	base: {
		// bg: "bg.accent",
	}
})
