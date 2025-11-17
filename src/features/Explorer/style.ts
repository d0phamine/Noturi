import { cva } from "@/styles/panda/css"

export const explorerRecipe = cva({
    base: {
        height: "100%",
        display: "flex",
        bg: "bg.primary",
        borderRightWidth: "{spacing.px}",
        borderRightColor: "border.primary",
        borderRightStyle: "solid",
    }
})