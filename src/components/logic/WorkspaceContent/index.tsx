import { MonacoEditor } from "@/features"

import { FC, useRef } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { WorkspaceAdditions, WorkspaceTabs } from "@/components"

import {
	workspaceContentRecipe,
	workspaceHeaderRecipe,
	workspaceRecipe
} from "./style"

export const WorkspaceContent: FC<{ workspaceId: string }> = observer(
	({ workspaceId }) => {
		const { WorkspaceStore } = useStores()
		const contentRef = useRef<HTMLDivElement>(null)

		// Если workspace был удален, не рендерим
		const workspace = WorkspaceStore.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === workspaceId
		)
		if (!workspace) {
			return null
		}

		return (
			<div data-component="workspace" className={workspaceRecipe()}>
				<div
					data-component="workspace-header"
					className={workspaceHeaderRecipe()}
				>
					<WorkspaceTabs workspaceId={workspaceId} />
					<WorkspaceAdditions />
				</div>
				<div
					data-component="workspace-content"
					className={workspaceContentRecipe()}
					ref={contentRef}
				>
					<MonacoEditor workspaceId={workspaceId}/>
				</div>
			</div>
		)
	}
)

