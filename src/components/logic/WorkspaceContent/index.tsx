import { MonacoEditor } from "@/features"

import { FC, useRef } from "react"

import { observer } from "mobx-react-lite"

import { WorkspaceAdditions, WorkspaceTabs } from "@/components"

import {
	workspaceContentRecipe,
	workspaceHeaderRecipe,
	workspaceRecipe
} from "./style"

export const WorkspaceContent: FC<{ workspaceId: string }> = observer(
	({ workspaceId }) => {
		const contentRef = useRef<HTMLDivElement>(null)
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

