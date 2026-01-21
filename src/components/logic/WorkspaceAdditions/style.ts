import { cva } from "@/styles/panda/css"

export const workspaceAdditionsRecipe = cva({
	base: {
		display: "flex",
		flexDirection: "row",
		flexShrink: "0",
		flexBasis: "auto",
		gap: "{spacing.px}",
        alignItems: "center",
        padding: "{spacing.1}"
	}
})
