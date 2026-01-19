import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const workspaceRecipe = cva({
	base: {
		height: "100%",
		width: "100%",
		maxWidth: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateRows: "{spacing.9} 1fr",
		margin: "unset"
	}
})

export const workspaceHeaderRecipe = cva({
	base: {
		overflow: "hidden",
		width: "100%",
		display: "flex",
		flexDirection: "row"
	}
})

export const workspaceContentRecipe = cva({
	base: {
		height: "100%",
		width: "100%",
		overflow: "hidden"
	}
})

