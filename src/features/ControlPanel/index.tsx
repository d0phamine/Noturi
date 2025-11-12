import { FC } from "react"

import { controlPanelRecipe } from "./style"

export const ControlPanel: FC = () => {
	return (
		<div
			data-compoenent="control-panel"
			className={controlPanelRecipe()}
		></div>
	)
}
