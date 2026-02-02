import { FC } from "react"
import TreeView, {
	INode,
	type ITreeViewOnNodeSelectProps,
	flattenTree
} from "react-accessible-treeview"

import { observer } from "mobx-react-lite"
import { v4 as uuidv4 } from "uuid"

import { useStores } from "@/store"
import { FileTree } from "@/store/FsStore"
import { FileTabDataType } from "@/store/WorkspaceStore"

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
	const { expandedTreeIds, workspaces } = WorkspaceStore.WorkspaceStoreData

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

	const selectHandler = async (e: ITreeViewOnNodeSelectProps) => {
		const { metadata, name } = e.element

		if (isFileTreeMetadata(metadata)) {
			const content = await FsStore.readFile(metadata)

			if (!metadata.isDirectory) {
				const newTabId = uuidv4()
				const modData: FileTabDataType = {
					id: newTabId,
					filePath: metadata.path,
					fileName: name,
					originalContent: content || "",
					content: content || "",
					changed: false
				}
				if (!workspaces.length) {
					const newWorkspaceId = WorkspaceStore.createWorkspace()
					WorkspaceStore.addTabToWorkspace(modData, newWorkspaceId)
					WorkspaceStore.setActiveFileTabIdInWorkspace(
						newWorkspaceId,
						newTabId
					)
				} else {
					const activeWorkspace = WorkspaceStore.activeWorkspace

					if (activeWorkspace) {
						const haveCopyTabs = activeWorkspace.tabs.some(
							(tab) => tab.filePath === modData.filePath
						)
						if (!haveCopyTabs) {
							WorkspaceStore.addTabToWorkspace(
								modData,
								activeWorkspace.id
							)

							WorkspaceStore.setActiveFileTabIdInWorkspace(
								activeWorkspace.id,
								newTabId
							)
						} else {
							const catchId =
								activeWorkspace.tabs.find(
									(tab) => tab.filePath === metadata.path
								)?.id || ""
							WorkspaceStore.setActiveFileTabIdInWorkspace(
								activeWorkspace.id,
								catchId
							)
						}
					}
				}
			}
		}
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
			onNodeSelect={async (e) => selectHandler(e)}
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

