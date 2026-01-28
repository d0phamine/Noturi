import { IconButton } from "@chakra-ui/react"

import { FC } from "react"

import { Columns2, ScanEye } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { isMarkdownFile } from "@/utils/extensions"

import { workspaceAdditionsRecipe } from "./style"

export const WorkspaceAdditions: FC = observer(() => {
	const { WorkspaceStore } = useStores()

	const activeWorkspace = WorkspaceStore.activeWorkspace
	const wsTabs = activeWorkspace?.tabs || []
	const activeWsTabId = activeWorkspace?.activeWsTabId || ""

	const activeTab = wsTabs.find((tab) => tab.id === activeWsTabId)

	return (
		<div
			data-component="workspace-additions"
			className={workspaceAdditionsRecipe()}
		>
			{activeTab && isMarkdownFile(activeTab.fileName) ? (
				<IconButton size={"2xs"} variant="ghost">
					<ScanEye></ScanEye>
				</IconButton>
			) : null}
			{activeTab ? (
				<IconButton
					size={"2xs"}
					variant="ghost"
					onClick={() => WorkspaceStore.splitWorkspace(activeTab)}
				>
					<Columns2></Columns2>
				</IconButton>
			) : null}
		</div>
	)
})

