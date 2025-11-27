import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const controlPanelRecipe = cva({
	base: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		bg: "bg.primary",
		borderRightWidth: "{spacing.px}",
		borderRightColor: "border.primary",
		borderRightStyle: "solid"
	}
})

export const controlPanelTabsRecipe = defineSlotRecipe({
	slots: ["root", "list", "trigger", "content", "indicator"],
	base: {
		trigger: {
			_selected: {
				color: "text.primary",
				_hover: {
					color: "text.primary"
				}
			},
			_hover: {
				color: "text.secondary"
			},
			paddingBlock: "{spacing.3}",
			color: "text.tertiary"
		},
		indicator: {
			borderRadius: "radii.none",
			borderLeftWidth: "{spacing.0.5}",
			borderLeftColor: "info",
			borderLeftStyle: "solid",
			bg: "transparent",
			shadow: "none"
		}
	}
})

export const controlPanelSettingsRecipe = cva({
	base: {
		mt: "auto",
		color: "text.tertiary",
		_hover: {
			color: "text.secondary",
			bg: "transparent"
		},
		"& svg": {
			width: "{spacing.6}",
			height: "{spacing.6}"
		}
	}
})

export const controlPanelFooter = cva({
	base: {
		height: "{spacing.6}",
		borderTopWidth: "{spacing.px}",
		borderTopColor: "border.primary",
		borderTopStyle: "solid",
		flexShrink: 0
	}
})

