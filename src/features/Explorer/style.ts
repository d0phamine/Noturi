import { cva } from "@/styles/panda/css"

export const explorerRecipe = cva({
    base: {
        height: "100%",
        display: "grid",
        gridTemplateRows:"{spacing.9} auto {spacing.6}",
        bg: "{colors.gray.900}",
        borderRightWidth: "{spacing.px}",
        borderRightColor: "border.primary",
        borderRightStyle: "solid",
    }
})

export const explorerHeaderRecipe = cva({
    base: {
        fontSize: "xs",
        textTransform: "uppercase",
        color: "text.primary",
        borderBottomWidth: "{spacing.px}",
        borderBottomColor: "border.primary",
        borderBottomStyle: "solid",
        display: "flex",
        alignItems: "center",
        padding: "0px {spacing.6}"
    }
})

export const explorerFooterRecipe = cva({
    base: {
        borderTopWidth: "{spacing.px}",
        borderTopColor: "border.primary",
        borderTopStyle: "solid",
        bg: "bg.primary",
    }
})