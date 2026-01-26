import { makeAutoObservable, remove } from "mobx"
import { v4 as uuidv4 } from "uuid"

import { FileTreeMetadata } from "@/store/FsStore"

export type FileTabDataType = {
	id: string
	name: string
	path: string
	content: string
	originalContent: string
	changed: boolean
}

export type WorkspaceDataType = {
	id: string
	tabs: FileTabDataType[]
	activeFileTabId: string
}

export interface IWorkspaceStore {
	// fileTabs: FileTabDataType[]
	activeFileTabId: string
	workspaces: WorkspaceDataType[]
	activeWorkspaceId: string
	expandedTreeIds: string[]
}

export class WorkspaceStore {
	public WorkspaceStoreData: IWorkspaceStore = {
		// fileTabs: [],
		activeFileTabId: "",
		workspaces: [],
		activeWorkspaceId: "",
		expandedTreeIds: []
	}

	constructor() {
		makeAutoObservable(this)
	}

	public createWorkspace = () => {
		const newWorkspaceId = uuidv4()
		this.WorkspaceStoreData.workspaces.push({
			id: newWorkspaceId,
			tabs: [],
			activeFileTabId: ""
		})
		this.WorkspaceStoreData.activeWorkspaceId = newWorkspaceId
		return newWorkspaceId
	}

	get activeWorkspace(): WorkspaceDataType | undefined {
		return this.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === this.WorkspaceStoreData.activeWorkspaceId
		)
	}

	get activeFileTabId(): string {
		return this.activeWorkspace?.activeFileTabId || ""
	}

	public setActiveWorkspaceId = (workspaceId: string) => {
		this.WorkspaceStoreData.activeWorkspaceId = workspaceId
	}

	public setActiveFileTabId = (tabId: string) => {
		this.WorkspaceStoreData.activeFileTabId = tabId
	}

	public addTabToWorkspace = (tab: FileTabDataType, workspaceId: string) => {
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === workspaceId) {
					return {
						...ws,
						tabs: [...ws.tabs, tab]
					}
				}
				return ws
			})
	}

	public addFileTab = (
		name: string,
		metadata: FileTreeMetadata,
		id: string,
		content: string
	) => {
		if (!metadata.isDirectory) {
			const modData: FileTabDataType = {
				id: id,
				name: name,
				path: metadata.path,
				originalContent: content,
				content: content,
				changed: false
			}

			if (!this.WorkspaceStoreData.workspaces.length) {
				const newWorkspaceId = this.createWorkspace()
				this.addTabToWorkspace(modData, newWorkspaceId)
			} else if (!this.activeWorkspace?.tabs.includes(modData)) {
				this.addTabToWorkspace(
					modData,
					this.WorkspaceStoreData.activeWorkspaceId
				)
				this.setActiveFileTabId(modData.id)
			}
		}
	}
	// public addFileTab = (
	// 	name: string,
	// 	metadata: FileTreeMetadata,
	// 	id: string,
	// 	content: string
	// ) => {
	// 	if (!metadata.isDirectory) {
	// 		const modData: FileTabDataType = {
	// 			id: id,
	// 			name: name,
	// 			path: metadata.path,
	// 			originalContent: content,
	// 			content: content,
	// 			changed: false
	// 		}
	// 		if (
	// 			!this.WorkspaceStoreData.fileTabs.some((item) => item.id === id)
	// 		)
	// 			this.WorkspaceStoreData.fileTabs?.push(modData)

	// 		this.setActiveFileTabId(modData.id)
	// 	}
	// }

	// public setActiveFileTabId = (value: string) => {
	// 	this.WorkspaceStoreData.activeFileTabId = value
	// }

	public deleteFileTab = (tabId: string) => {
		// Находим рабочее пространство, содержащее вкладку с указанным id
		const workspaceWithTab = this.WorkspaceStoreData.workspaces.find((ws) =>
			ws.tabs.some((tab) => tab.id === tabId)
		)

		// Обновляем вкладки в рабочих пространствах
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				return {
					...ws,
					tabs: ws.tabs.filter((tab) => tab.id !== tabId)
				}
			})

		// После фильтрации проверяем, остались ли вкладки в рабочем пространстве
		const emptyWorkspaces = this.WorkspaceStoreData.workspaces.filter(
			(ws) => ws.tabs.length === 0
		)

		// Удаляем пустые рабочие пространства
		if (emptyWorkspaces.length > 0) {
			this.WorkspaceStoreData.workspaces =
				this.WorkspaceStoreData.workspaces.filter(
					(ws) => ws.tabs.length > 0
				)
		}

		// Если после удаления не осталось рабочих пространств, сбрасываем активное
		if (this.WorkspaceStoreData.workspaces.length === 0) {
			this.WorkspaceStoreData.activeWorkspaceId = ""
		}
		// Если было удалено активное рабочее пространство, делаем активным первое оставшееся
		else if (
			!this.WorkspaceStoreData.workspaces.some(
				(ws) => ws.id === this.WorkspaceStoreData.activeWorkspaceId
			)
		) {
			this.WorkspaceStoreData.activeWorkspaceId =
				this.WorkspaceStoreData.workspaces[
					this.WorkspaceStoreData.workspaces.length - 1
				].id
		}
		// Если в активном рабочем пространстве была удалена активная вкладка, выбираем новую активную вкладку
		else {
			const activeWorkspace = this.activeWorkspace
			if (
				activeWorkspace &&
				workspaceWithTab &&
				workspaceWithTab.id === activeWorkspace.id &&
				tabId === activeWorkspace.activeFileTabId
			) {
				if (activeWorkspace.tabs.length > 0) {
					// Если остались другие вкладки, делаем активной первую
					activeWorkspace.activeFileTabId =
						activeWorkspace.tabs[
							this.WorkspaceStoreData.workspaces.length - 1
						].id
				} else {
					// Это условие не должно выполниться, так как пустые рабочие пространства уже удалены
					activeWorkspace.activeFileTabId = ""
				}
			}
		}
	}

	// public deleteFileTab = (tabId: string) => {
	// 	this.WorkspaceStoreData.fileTabs =
	// 		this.WorkspaceStoreData.fileTabs.filter(
	// 			(value) => value.id !== tabId
	// 		)
	// 	if (
	// 		this.WorkspaceStoreData.fileTabs.length != 0 &&
	// 		this.WorkspaceStoreData.activeFileTabId === tabId
	// 	) {
	// 		this.setActiveFileTabId(
	// 			this.WorkspaceStoreData.fileTabs[
	// 				this.WorkspaceStoreData.fileTabs.length - 1
	// 			].id
	// 		)
	// 	}
	// }

	public setFileChanged = (newContent: string) => {
		if (!this.activeWorkspace) return

		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === this.WorkspaceStoreData.activeWorkspaceId) {
					return {
						...ws,
						tabs: ws.tabs.map((tab) => {
							if (tab.id === ws.activeFileTabId) {
								return {
									...tab,
									content: newContent,
									changed: tab.originalContent !== newContent
								}
							}
							return tab
						})
					}
				}
				return ws
			})
	}

	public setFileUnсhanged = () => {
		if (!this.activeWorkspace) return

		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === this.WorkspaceStoreData.activeWorkspaceId) {
					return {
						...ws,
						tabs: ws.tabs.map((tab) => {
							if (tab.id === ws.activeFileTabId) {
								return {
									...tab,
									changed: false
								}
							}
							return tab
						})
					}
				}
				return ws
			})
	}

	// public setFileChanged = (newContent: string) => {
	// 	this.WorkspaceStoreData.fileTabs = this.WorkspaceStoreData.fileTabs.map(
	// 		(tab) => {
	// 			if (tab.id === this.WorkspaceStoreData.activeFileTabId) {
	// 				return {
	// 					...tab,
	// 					content: newContent,
	// 					changed: tab.originalContent !== newContent
	// 				}
	// 			}
	// 			return tab
	// 		}
	// 	)
	// }

	// public setFileUnсhanged = () => {
	// 	this.WorkspaceStoreData.fileTabs = this.WorkspaceStoreData.fileTabs.map(
	// 		(tab) => {
	// 			if (tab.id === this.WorkspaceStoreData.activeFileTabId) {
	// 				return {
	// 					...tab,
	// 					changed: false
	// 				}
	// 			}
	// 			return tab
	// 		}
	// 	)
	// }

	public setExpandedTreeIds = (id: string, isExpanded: boolean) => {
		const newSet = new Set(this.WorkspaceStoreData.expandedTreeIds)

		if (isExpanded) {
			newSet.add(id)
		} else {
			newSet.delete(id)
		}

		this.WorkspaceStoreData.expandedTreeIds = Array.from(newSet)
	}

	public expandTreeAncestors = (ancestorIds: string[]) => {
		const newSet = new Set([
			...this.WorkspaceStoreData.expandedTreeIds,
			...ancestorIds
		])
		this.WorkspaceStoreData.expandedTreeIds = Array.from(newSet)
	}
}

