import { cva } from "@/styles/panda/css"

export const workspaceTreeViewRecipe = cva({
	base: {
		width: "100%"
	}
})

export const workspaceTreeViewElemRecipe = cva({
	base: {
		fontSize: "xs",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "{spacing.px}",
		cursor:"pointer",
		_hover: {
			bg: "bg.secondary"
		},
		_selected: {
			boxShadow: "inset 0 0 0 1px {colors.primary.400}",
			bg: "bg.secondary"
		},
		"& svg": {
			width: "{spacing.4}",
			height: "{spacing.4}",
			flexShrink: "0"
		},
		"& p": {
			textOverflow: "clip",
			overflow: "hidden",
			whiteSpace: "nowrap"
		}
	},
	variants: {
		level: {
			0: { paddingLeft: "0px" },
			1: { paddingLeft: "6px" },
			2: { paddingLeft: "12px" },
			3: { paddingLeft: "18px" },
			4: { paddingLeft: "24px" },
			5: { paddingLeft: "26px" },
			6: { paddingLeft: "28px" },
			7: { paddingLeft: "30px" },
			8: { paddingLeft: "32px" },
			9: { paddingLeft: "34px" },
			10: { paddingLeft: "36px" }
		}
	}
})

export const workspaceTreeViewSpacerRecipe = cva({
	base: {
		width: "{spacing.4}",
		height: "{spacing.4}",
		flexShrink: 0
	}
})

type TreeLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const getLimitedLevel = (level: number): TreeLevel => {
	return Math.min(Math.max(0, level), 10) as TreeLevel
}

