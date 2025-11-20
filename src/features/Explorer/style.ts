import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const explorerRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateRows: "{spacing.9} 1fr {spacing.6}",
		bg: "bg.accent",
		borderRightWidth: "{spacing.px}",
		borderRightColor: "border.primary",
		borderRightStyle: "solid"
	}
})

export const explorerHeaderRecipe = cva({
	base: {
		fontSize: "xs",
		textTransform: "uppercase",
		color: "text.primary",
		borderBottomWidth: "{spacing.px}",
		borderBottomColor: "border.primary",
		borderBottomStyle: "solid",
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

export const explorerFooterRecipe = cva({
	base: {
		borderTopWidth: "{spacing.px}",
		borderTopColor: "border.primary",
		borderTopStyle: "solid",
		bg: "bg.primary"
	}
})

