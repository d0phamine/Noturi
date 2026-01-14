import { MonacoEditor } from "@/features"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { WorkspaceAdditions, WorkspaceTabs } from "@/components"

import { workspaceHeaderRecipe, workspaceRecipe } from "./style"

export const WorkSpace: FC = observer(() => {
	return (
		<div data-component="workspace" className={workspaceRecipe()}>
			<div
				data-component="workspace-header"
				className={workspaceHeaderRecipe()}
			>
				<WorkspaceTabs />
				<WorkspaceAdditions />
			</div>
			<div data-component="workspace-content">
				<MonacoEditor />
			</div>
		</div>
	)
})

