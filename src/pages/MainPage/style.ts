import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const mainPageRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateColumns: "{spacing.12} minmax({spacing.36}, 1fr)",
		bg: "bg.primary",
		borderTopWidth: "1px",
		borderTopColor: "border.primary",
		borderTopStyle: "solid"
	}
})

export const mainPageSplitterRecipe = defineSlotRecipe({
	slots: ["root", "panel", "resizeTrigger", "resizeTriggerSeparator"],

	base: {
		root: {
			borderWidth: 0,
			width: "100%",
			overflow: "hidden"
		},
		resizeTriggerSeparator: {
			bg: "border.primary"
		},
		resizeTrigger: {
			zIndex: "{zIndex.sticky}",
			_dragging: {
				transition: "0.3s",
				bg: "{colors.primary.300}",
				"& .splitter__resizeTriggerSeparator": {
					transition: "0.3s",
					bg: "transparent"
				}
			}
		},
		panel: {
			overflow: "hidden",
			minWidth: 0, // Allow panels to shrink below their content size
			width: "100%", // Ensure panels use available width
			flexShrink: 1
		}
	}
})

export const mainPageFooterRecipe = cva({
	base: {
		bg: "bg.primary",
		borderTopWidth: "1px",
		borderTopColor: "border.primary",
		borderTopStyle: "solid"
	}
})

