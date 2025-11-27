import { FC } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { workspaceHeaderRecipe, workspaceRecipe } from "./style"

export const WorkSpace: FC = observer(() => {
	return (
		<div data-component="workspace" className={workspaceRecipe()}>
			<div
				data-component="workspace-header"
				className={workspaceHeaderRecipe()}
			></div>
			<div data-component="workspace-content"></div>
			<div data-component="workspace-footer"></div>
		</div>
	)
})

