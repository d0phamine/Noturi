import { defineSlotRecipe } from "@chakra-ui/react"

export const accordionCustomItemRecipe = defineSlotRecipe({
	slots: ["item", "itemTrigger", "itemIndicator", "itemContent", "itemBody"],
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
		},
		itemBody: {
			display: "flex",
			justifyContent: "center",
			"& button": {
				width: "100%",
				backgroundColor: "buttons.solid",
				_hover: {
					backgroundColor: "buttons.solid_hover"
				},
				color: "text.primary"
			}
		}
	}
})

