import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const simpleDialogRecipe = defineSlotRecipe({
	slots: [
		"content",
		"header",
		"body",
		"footer",
		"actionTrigger",
		"footer",
		"closeTrigger"
	],

	base: {
		content: {
			bg: "bg.primary"
		},
		header: {
			padding: "{spacing.3} {spacing.3}",
			alignItems: "center",
			gap: "{spacing.3}",
			"& h2": {
				fontSize: "xs",
				lineHeight: "none",
				fontWeight: "bold"
			},
			"& svg": {
				height: "{spacing.5}",
				width: "{spacing.5}"
			}
		},
		body: {
			minHeight: "{spacing.6}",
			padding: "0px {spacing.11}",
			paddingInline: "unset",
			"& p": {
				fontSize: "xs",
				lineHeight: "none"
			}
		},
		footer: {
			padding: "{spacing.2} {spacing.3}",
			gap: "{spacing.3}",
			"& button:first-child": {
				bg: "{colors.bg.tertiary}"
			},
			"& button:last-child": {
				bg: "{colors.buttons.solid}"
			},
			"& button": {
				_hover: {
					bg: "{colors.buttons.solid_hover}"
				}
			}
		}
	}
})

