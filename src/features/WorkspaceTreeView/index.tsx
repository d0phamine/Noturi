import { FC, useEffect, useRef, useState } from "react"
import TreeView, { INode, flattenTree } from "react-accessible-treeview"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTree } from "@/store/FsStore"

import { isFileTreeMetadata } from "@/utils/typeguards"

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
	const { FsStore, WorkspaceStore } = useStores()

	const { selectedFileTree } = FsStore.FsStoreData
	const { expandedTreeIds } = WorkspaceStore.WorkspaceStoreData

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

	const treeViewData = flattenTree<FileMetadata>(rootNode) as FileTreeNode[]

	const catchSelectedId = () => {
		const activeWsTab = WorkspaceStore.activeWorkspace?.tabs.find(
			(tab) => tab.id === WorkspaceStore.activeWorkspace?.activeWsTabId
		)
		const catchId = treeViewData.find(
			(item) => item.metadata?.path === activeWsTab?.filePath
		)?.id
		return catchId ? [catchId] : []
	}

	return (
		<TreeView
			data={treeViewData}
			aria-label="directory tree"
			togglableSelect={false}
			clickAction="EXCLUSIVE_SELECT"
			expandedIds={expandedTreeIds}
			selectedIds={catchSelectedId()}
			className={workspaceTreeViewRecipe()}
			onNodeSelect={async (e) => {
				const { metadata, name } = e.element
				if (isFileTreeMetadata(metadata)) {
					const content = await FsStore.readFile(metadata)
					// Передаем имя файла и метаданные, новый ID будет сгенерирован в Store
					WorkspaceStore.addFileTab(name, metadata, content || "")
				}
			}}
			onExpand={(props) => {
				WorkspaceStore.setExpandedTreeIds(
					props.element.id as string,
					props.isExpanded
				)
			}}
			nodeRenderer={({ element, isExpanded, getNodeProps, level }) => (
				<div
					{...getNodeProps()}
					className={workspaceTreeViewElemRecipe({
						level: getLimitedLevel(level)
					})}
					aria-label={element.name}
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

