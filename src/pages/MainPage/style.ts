import { cva } from "@/styles/panda/css"

export const mainPageRecipe = cva({
	base: {
		height: "100%",
		overflow: "hidden",
		display: "grid",
		gridTemplateColumns: "48px 1fr 1fr",
		bg: "bg.primary",
		borderTopWidth: "1px",
        borderTopColor: "border.primary",
        borderTopStyle: "solid",
	}
})

