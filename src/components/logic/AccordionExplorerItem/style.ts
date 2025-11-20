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
			// Ключевые свойства для элементов аккордеона
			"&[data-state=open]": {
				flex: "1 1 auto", // Когда открыт - растягивается, занимая доступное пространство
			},
			"&[data-state=closed]": {
				flex: "0 0 auto", // Когда закрыт - сжимается до своего содержимого
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
			flexDirection: "column"
		},
		itemBody: {
			display: "flex",
			justifyContent: "center",
			overflow: "auto",
			flex: "1 1 auto",
			minHeight: 0,

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

