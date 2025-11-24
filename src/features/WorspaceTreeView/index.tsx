import { getExtension } from "@/utils"

import { FC } from "react"
import TreeView, { flattenTree } from "react-accessible-treeview"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTree } from "@/store/FsStore"

import {
	ChevronExplorerIcon,
	FileExplorerIcon,
	FolderExplorerIcon
} from "@/components"

import {
	getLimitedLevel,
	workspaceTreeViewElemRecipe,
	workspaceTreeViewRecipe,
	workspaceTreeViewSpacerRecipe
} from "./style"

export const WorkspaceTreeView: FC = observer(() => {
	const { FsStore } = useStores()

	const { selectedFileTree } = FsStore.FsStoreData

	const rootNode: FileTree = {
		id: "root",
		name: "Root",
		path: "/",
		isDirectory: true,
		children: selectedFileTree ?? []
	}

	const data = flattenTree(rootNode)

	return (
		<TreeView
			data={data}
			aria-label="directory tree"
			togglableSelect
			clickAction="EXCLUSIVE_SELECT"
			multiSelect
			className={workspaceTreeViewRecipe()}
			nodeRenderer={({
				element,
				isBranch,
				isExpanded,
				getNodeProps,
				level,
				handleSelect
			}) => (
				<div
					{...getNodeProps()}
					className={workspaceTreeViewElemRecipe({
						level: getLimitedLevel(level)
					})}
				>
					{isBranch ? (
						<ChevronExplorerIcon isOpen={isExpanded} />
					) : (
						<div className={workspaceTreeViewSpacerRecipe()}></div>
					)}
					{isBranch ? (
						<FolderExplorerIcon isOpen={isExpanded} />
					) : (
						<FileExplorerIcon />
					)}
					<p>{element.name}</p>
				</div>
			)}
		/>
	)
})

