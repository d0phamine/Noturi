import { FC } from "react"
import TreeView, { flattenTree } from "react-accessible-treeview"

import {
	ChevronDown,
	ChevronRight,
	File,
	Folder,
	FolderOpen
} from "lucide-react"
import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTree } from "@/store/FsStore"

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

	const FolderIcon: FC<{ isOpen: boolean }> = ({ isOpen }) =>
		isOpen ? <FolderOpen /> : <Folder />

	const ChevronIcon: FC<{ isOpen: boolean }> = ({ isOpen }) =>
		isOpen ? <ChevronDown /> : <ChevronRight />

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
						<ChevronIcon isOpen={isExpanded} />
					) : (
						<div className={workspaceTreeViewSpacerRecipe()}></div>
					)}
					{isBranch ? <FolderIcon isOpen={isExpanded} /> : <File />}
					<p>{element.name}</p>
				</div>
			)}
		/>
	)
})

