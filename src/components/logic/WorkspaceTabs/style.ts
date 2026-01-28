import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const workspaceTabsContainerRecipe = cva({
	base: {
		borderColor: "border.primary",
		flexGrow: "1",
		flexBasis: "auto",
		minWidth: 0,
		display: "flex",
		flexDirection: "column"
	}
})

export const workspaceTabsRecipe = defineSlotRecipe({
	slots: ["root", "list", "trigger", "placeholder", "iconholder"],

	base: {
		root: {
			height: "{spacing.9}",
			borderColor: "inherit",
			width: "100%",
			// Allow the root to provide a scrollable area for the tabs list
			overflowX: "auto",
			overflowY: "hidden"
		},
		list: {
			height: "{spacing.9}",
			minHeight: "unset",
			// Allow the list to grow to the width of its content so overflow occurs
			minWidth: "max-content",
			borderColor: "inherit",
			overflowX: "auto",
			overflowY: "hidden",
			display: "flex",
			flexDirection: "row",
			flexWrap: "nowrap"
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
			transition: "{durations.fast}",

			_selected: {
				borderBottomWidth: 0,
				bg: "bg.primary",
				boxShadow: "inset 0px 2px {colors.primary.400}",
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

