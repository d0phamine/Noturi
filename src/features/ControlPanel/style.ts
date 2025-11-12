import { cva } from "@/styles/panda/css"

export const controlPanelRecipe = cva({
	base: {
		height: "100%",
		display: "flex",
		bg: "bg.primary",
        borderRightWidth: "1px",
        borderRightColor: "border.primary",
        borderRightStyle: "solid",
	}
})