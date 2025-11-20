import { defineSlotRecipe } from "@chakra-ui/react"

export const accordionCustomItemRecipe = defineSlotRecipe({
	slots: ["item", "itemTrigger", "itemIndicator", "itemContent", "itemBody"],
	base: {
		item: {
			borderBottomWidth: "{spacing.px}",
			borderBottomColor: "border.primary",
			borderBottomStyle: "solid",
			display: "flex",
			flexDirection: "column",
			"&[data-state=open]": {
				flex: "1 1 auto"
			},
			"&[data-state=closed]": {
				flex: "0 0 auto"
			}
		},
		itemTrigger: {
			padding: "{spacing.0.5} {spacing.0.5}",
			fontSize: "xs",
			fontWeight: "bold",
			textTransform: "uppercase",
			gap: "{spacing.1}",
			flexShrink: 0
		},
		itemContent: {
			overflow: "auto",
			flex: "1 1 0px",
			minHeight: 0,
			maxHeight: "100%",
			display: "flex",
			flexDirection: "column",
			padding:"0"
		},
		itemBody: {
			display: "flex",
			justifyContent: "start",
			overflow: "auto",
			flex: "1 1 auto",
			minHeight: 0,
			padding: "0 0",

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

