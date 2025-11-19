import { defineSlotRecipe } from "@chakra-ui/react"

export const accordionCustomItemRecipe = defineSlotRecipe({
	slots: [
		"item",
		"itemTrigger",
		"itemIndicator",
		"itemContent",
		"itemBody"
	],
	base: {
		item: {
			borderBottomWidth: "{spacing.px}",
			borderBottomColor: "border.primary",
			borderBottomStyle: "solid"
		},
		itemTrigger: {
			padding: "{spacing.0.5} {spacing.0.5}",
			fontSize: "xs",
			fontWeight: "bold",
			textTransform: "uppercase",
			gap: "{spacing.1}"
		}
	}
})