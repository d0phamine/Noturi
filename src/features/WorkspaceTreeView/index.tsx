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
	const { activeFileTabId, expandedWorkspaceIds } =
		WorkspaceStore.WorkspaceStoreData

	const activeWorkspaceTreeViewElemRef = useRef<HTMLDivElement>(null)

	const selectedIds = activeFileTabId ? [activeFileTabId] : []

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

	const getAncestorIds = (
		nodeId: string | number,
		flatData: FileTreeNode[]
	): (string | number)[] => {
		const ancestorIds: (string | number)[] = []
		let currentNode = flatData.find((node) => node.id === nodeId)

		while (currentNode && currentNode.parent !== null) {
			const parentNode = flatData.find(
				(node) => node.id === currentNode!.parent
			)
			if (parentNode && parentNode.parent !== null) {
				ancestorIds.push(parentNode.id)
			}
			currentNode = parentNode
		}

		return ancestorIds
	}

	useEffect(() => {
		// for opening dirs in treeview for active tab
		if (activeFileTabId) {
			const ancestorIds = getAncestorIds(activeFileTabId, treeViewData)
			WorkspaceStore.expandWorkspaceAncestors(ancestorIds as string[])
		}
		// for automate scrolling to active element in treeview
		if (activeWorkspaceTreeViewElemRef.current) {
			activeWorkspaceTreeViewElemRef.current?.scrollIntoView({
				behavior: "instant",
				block: "center",
				inline: "nearest"
			})
		}
	}, [activeFileTabId])

	return (
		<TreeView
			data={treeViewData}
			aria-label="directory tree"
			togglableSelect
			clickAction="EXCLUSIVE_SELECT"
			selectedIds={selectedIds}
			expandedIds={expandedWorkspaceIds}
			multiSelect
			className={workspaceTreeViewRecipe()}
			onNodeSelect={async (e) => {
				const { metadata, name, id } = e.element
				const newSelectedIds = Array.from(
					e.treeState?.selectedIds ?? []
				)
				if (
					newSelectedIds.length === 1 &&
					isFileTreeMetadata(metadata)
				) {
					const content = await FsStore.readFile(metadata)
					WorkspaceStore.addFileTab(
						name,
						metadata,
						id as string,
						content || ""
					)
				}

				console.log(newSelectedIds)
			}}
			onExpand={(props) => {
				WorkspaceStore.setExpandedWorkspaceIds(
					props.element.id as string,
					props.isExpanded
				)
			}}
			nodeRenderer={({
				element,
				isExpanded,
				getNodeProps,
				level,
				isSelected
			}) => (
				<div
					{...getNodeProps()}
					className={workspaceTreeViewElemRecipe({
						level: getLimitedLevel(level)
					})}
					ref={
						activeFileTabId === element.id
							? activeWorkspaceTreeViewElemRef
							: null
					}
					aria-selected={isSelected}
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

