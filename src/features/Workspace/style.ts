import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const workspaceRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateRows: "{spacing.9} 1fr",
		margin: "unset"
	}
})

export const workspaceHeaderRecipe = cva({
	base: {
		overflow: "hidden",
		display: "flex",
		flexDirection: "row",
	}
})

