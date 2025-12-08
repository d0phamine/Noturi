import { makeAutoObservable } from "mobx"

import { FileTreeMetadata } from "@/store/FsStore"

export type FileTabDataType = {
	id: string
	name: string
	path: string
}

export interface IWorkspaceStore {
	fileTabs: FileTabDataType[]
	activeFileTab: string
}

export class WorkspaceStore {
	public WorkspaceStoreData: IWorkspaceStore = {
		fileTabs: [],
		activeFileTab: ""
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

			this.setActiveFileTab(modData.id)
		}
	}

	public setActiveFileTab = (value: string) => {
		this.WorkspaceStoreData.activeFileTab = value
	}

	public deleteFileTab = (tabId: string) => {
		this.WorkspaceStoreData.fileTabs =
			this.WorkspaceStoreData.fileTabs.filter(
				(value) => value.id !== tabId
			)
	}
}

