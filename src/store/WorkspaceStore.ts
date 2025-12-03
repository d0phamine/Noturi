import { makeAutoObservable } from "mobx"
import { v4 as uuidv4 } from "uuid"

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

	public addFileTab = (name: string, metadata: FileTreeMetadata) => {
		if (!metadata.isDirectory) {
			const modData: FileTabDataType = {
				id: uuidv4(),
				name: name,
				path: metadata.path
			}
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

