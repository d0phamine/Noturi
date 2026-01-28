import { defineSlotRecipe } from "@chakra-ui/react"

import { cva } from "@/styles/panda/css"

export const workspaceSplitContainerRecipe = cva({
	base: {
		height: "100%",
		width: "100%",
		overflow: "hidden"
	}
})

