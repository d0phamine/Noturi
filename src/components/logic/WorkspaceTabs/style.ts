import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const workspaceTabsContainerRecipe = cva({
	base: {
		height: "100%",
		borderColor: "border.primary",
		flexGrow: "1",
		flexBasis: "auto",
		minWidth: 0
	}
})

export const workspaceTabsRecipe = defineSlotRecipe({
	slots: ["root", "list", "trigger", "placeholder", "iconholder"],

	base: {
		root: {
			height: "{spacing.9}",
			borderColor: "inherit",
		},
		list: {
			height: "{spacing.9}",
			minHeight: "unset",
			width: "100%",
			borderColor: "inherit",
			overflowX: "auto"
		},
		trigger: {
			fontSize: "xs",
			padding: "0 {spacing.3}",
			height: "{spacing.9}",
			borderColor: "inherit",
			borderRightWidth: "{spacing.px}",
			borderBottomWidth: "{spacing.px}",
			borderRadius: 0,
			bg: "bg.accent",
			flexShrink: 0,

			_selected: {
				borderBottomWidth: 0,
				bg: "bg.primary",
				boxShadow: "inset 0px 1px {colors.primary.400}",
				transition: "{durations.fast}",
				_hover: {
					bg: "bg.primary"
				}
			},

			_hover: {
				bg: "bg.primary"
			}
		},
		placeholder: {
			height: "{spacing.4}",
			width: "{spacing.4}"
		},
		iconholder: {
			height: "{spacing.4}",
			width: "{spacing.4}"
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

