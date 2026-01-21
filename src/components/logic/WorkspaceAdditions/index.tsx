import { IconButton } from "@chakra-ui/react"

import { FC } from "react"

import { Columns2, ScanEye } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { isMarkdownFile } from "@/utils/extensions"

import { workspaceAdditionsRecipe } from "./style"

export const WorkspaceAdditions: FC = observer(() => {
	const { WorkspaceStore } = useStores()

	const { activeFileTabId, fileTabs } = WorkspaceStore.WorkspaceStoreData

	const activeTab = fileTabs.find((tab) => tab.id === activeFileTabId)

	return (
		<div
			data-component="workspace-additions"
			className={workspaceAdditionsRecipe()}
		>
			{activeTab && isMarkdownFile(activeTab.name) ? (
				<IconButton size={"2xs"} variant="ghost">
					<ScanEye></ScanEye>
				</IconButton>
			) : null}
			{activeTab ? (
				<IconButton size={"2xs"} variant="ghost">
					<Columns2></Columns2>
				</IconButton>
			) : null}
		</div>
	)
})

