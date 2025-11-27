import { FC } from "react"
import TreeView, { INode, flattenTree } from "react-accessible-treeview"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTree } from "@/store/FsStore"

import {
	ChevronExplorerIcon,
	ExplorerFileIcon,
	ExplorerFolderIcon
} from "@/components"

import {
	getLimitedLevel,
	workspaceTreeViewElemRecipe,
	workspaceTreeViewRecipe,
	workspaceTreeViewSpacerRecipe
} from "./style"

interface FileMetadata {
	path: string
	isDirectory: boolean
	[key: string]: string | boolean
}

type FileTreeNode = INode<FileMetadata>

const convertToTreeWithMetadata = (tree: FileTree[]): any[] => {
	return tree.map((node) => ({
		id: node.id,
		name: node.name,
		metadata: {
			path: node.path,
			isDirectory: node.isDirectory
		},
		children: node.children
			? convertToTreeWithMetadata(node.children)
			: undefined
	}))
}

export const WorkspaceTreeView: FC = observer(() => {
	const { FsStore } = useStores()

	const { selectedFileTree } = FsStore.FsStoreData

	const convertedChildren = selectedFileTree
		? convertToTreeWithMetadata(selectedFileTree)
		: []

	const rootNode: FileTree = {
		id: "root",
		name: "Root",
		path: "/",
		isDirectory: true,
		children: convertedChildren
	}

	const data = flattenTree<FileMetadata>(rootNode) as FileTreeNode[]

	return (
		<TreeView
			data={data}
			aria-label="directory tree"
			togglableSelect
			clickAction="EXCLUSIVE_SELECT"
			multiSelect
			className={workspaceTreeViewRecipe()}
			onNodeSelect={(e) =>
				FsStore.readFile(e.element.metadata?.path as string)
			}
			nodeRenderer={({ element, isExpanded, getNodeProps, level }) => (
				<div
					{...getNodeProps()}
					className={workspaceTreeViewElemRecipe({
						level: getLimitedLevel(level)
					})}
				>
					{element.metadata?.isDirectory ? (
						<ChevronExplorerIcon isOpen={isExpanded} />
					) : (
						<div className={workspaceTreeViewSpacerRecipe()}></div>
					)}
					{element.metadata?.isDirectory ? (
						<ExplorerFolderIcon
							isOpen={isExpanded}
							folderName={element.name}
						/>
					) : (
						<ExplorerFileIcon fileName={element.name} />
					)}
					<p>{element.name}</p>
				</div>
			)}
		/>
	)
})

