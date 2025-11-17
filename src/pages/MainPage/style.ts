import { cva } from "@/styles/panda/css"

export const mainPageRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateColumns: "{spacing.12} {spacing.56} 1fr",
		bg: "bg.primary",
		borderTopWidth: "1px",
        borderTopColor: "border.primary",
        borderTopStyle: "solid",
	}
})

