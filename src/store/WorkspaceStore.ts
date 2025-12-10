import { makeAutoObservable } from "mobx"

import { FileTreeMetadata } from "@/store/FsStore"

export type FileTabDataType = {
	id: string
	name: string
	path: string
}

export interface IWorkspaceStore {
	fileTabs: FileTabDataType[]
	activeFileTabId: string
	selectedWorkspaceIds: string[]
	expandedWorkspaceIds: string[]
}

export class WorkspaceStore {
	public WorkspaceStoreData: IWorkspaceStore = {
		fileTabs: [],
		activeFileTabId: "",
		selectedWorkspaceIds: [],
		expandedWorkspaceIds: []
	}

	constructor() {
		makeAutoObservable(this)
	}

	public addFileTab = (
		name: string,
		metadata: FileTreeMetadata,
		id: string
	) => {
		if (!metadata.isDirectory) {
			const modData: FileTabDataType = {
				id: id,
				name: name,
				path: metadata.path
			}
			if (
				!this.WorkspaceStoreData.fileTabs.some((item) => item.id === id)
			)
				this.WorkspaceStoreData.fileTabs?.push(modData)

			this.setActiveFileTabId(modData.id)
		}
	}

	public setActiveFileTabId = (value: string) => {
		this.WorkspaceStoreData.activeFileTabId = value
	}

	public deleteFileTab = (tabId: string) => {
		this.WorkspaceStoreData.fileTabs =
			this.WorkspaceStoreData.fileTabs.filter(
				(value) => value.id !== tabId
			)
	}

	public setExpandedWorkspaceIds = (id: string, isExpanded: boolean) => {
		const newSet = new Set(this.WorkspaceStoreData.expandedWorkspaceIds)

		if (isExpanded) {
			newSet.add(id)
		} else {
			newSet.delete(id)
		}

		this.WorkspaceStoreData.expandedWorkspaceIds = Array.from(newSet)
	}

	public expandWorkspaceAncestors = (ancestorIds: string[]) => {
		const newSet = new Set([
			...this.WorkspaceStoreData.expandedWorkspaceIds,
			...ancestorIds
		])
		this.WorkspaceStoreData.expandedWorkspaceIds = Array.from(newSet)
	}
}

