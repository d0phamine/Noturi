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
			"& h2": {
				fontSize: "xs",
				lineHeight: "none",
                fontWeight: "bold"
			}
		},
		body: {
			padding: "0px {spacing.3}",
            paddingInline: "unset",
			"& p": {
				fontSize: "xs",
				lineHeight: "none"
			}
		},
		footer: {
			padding: "{spacing.2} {spacing.3}"
		}
	}
})

