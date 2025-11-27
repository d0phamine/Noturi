import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const explorerRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateRows: "{spacing.9} 1fr",
		bg: "bg.accent",
	}
})

export const explorerHeaderRecipe = cva({
	base: {
		fontSize: "xs",
		textTransform: "uppercase",
		color: "text.primary",
		display: "flex",
		alignItems: "center",
		padding: "0px {spacing.5}",
		bg: "bg.accent"
	}
})

export const explorerContentRecipe = cva({
	base: {
		overflow: "hidden",
		height: "100%",
	}
})

export const explorerAccordionRootRecipe = defineSlotRecipe({
	slots: ["root"],
	base: {
		root: {
			height: "100%",
			overflow: "hidden",
			display: "flex",
			flexDirection:"column"
		}
	}
})

export const explorerAccordionWorkspaceButtonBlockRecipe = cva({
	base:{
		padding:"{spacing.4} {spacing.4}",
		w: "100%"
	}
})

