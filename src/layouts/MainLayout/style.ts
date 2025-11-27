import { cva } from "@/styles/panda/css"

export const layoutWrapperRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		borderBottomRadius: "lg",
	}
})

export const mainLayoutRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateRows: "1fr {spacing.5}"
	}
})

