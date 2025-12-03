import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const workspaceTabsContainerRecipe = cva({
	base: {
		height: "100%",
		borderColor: "border.primary"
	}
})

export const workspaceTabsRecipe = defineSlotRecipe({
	slots: ["root", "list", "trigger"],

	base: {
		root: {
			height: "{spacing.9}",
			borderColor: "inherit"
		},
		list: {
			height: "{spacing.9}",
			minHeight: "unset",
			width: "100%",
			borderColor: "inherit"
		},
		trigger: {
			fontSize: "xs",
			padding: "0 {spacing.4}",
			height: "{spacing.9}",
			borderColor: "inherit",
			borderRightWidth: "{spacing.px}",
			borderBottomWidth: "{spacing.px}",
			borderRadius: 0,
			bg: "bg.accent",

			_selected: {
				borderBottomWidth: 0,
				bg: "bg.primary"
			}
		}
	}
})

export const workspaceTabsListBorder = cva({
	base: {
		bg: "bg.accent",
		borderBottomWidth: "{spacing.px}",
		borderColor: "border.primary",
		display: "flex",
		flexGrow: 1
	},
	variants: {
		bg: {
			noTabs: {
				bg: "bg.primary",
				border: 0
			}
		}
	}
})

