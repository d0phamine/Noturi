import { FC } from "react"
import TreeView, { flattenTree } from "react-accessible-treeview"

import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTree } from "@/store/FsStore"

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

	return (
		<TreeView
			data={data}
			aria-label="directory tree"
			togglableSelect
			clickAction="EXCLUSIVE_SELECT"
			multiSelect
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
					style={{ paddingLeft: 20 * (level - 1) }}
				>
					{isBranch ? <FolderIcon isOpen={isExpanded} /> : <File />}
					{element.name}
				</div>
			)}
		/>
	)
})

