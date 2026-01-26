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

	public setActiveFileTabIdInWorkspace = (
		workspaceId: string,
		tabId: string
	) => {
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === workspaceId) {
					return {
						...ws,
						activeFileTabId: tabId
					}
				}
				return ws
			})
	}

	// public setActiveWorkspaceId = (workspaceId: string) => {
	// 	this.WorkspaceStoreData.activeWorkspaceId = workspaceId
	// }

	// public setActiveFileTabId = (tabId: string) => {
	// 	this.WorkspaceStoreData.activeFileTabId = tabId
	// }

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

			// Если нет рабочих пространств, создаем новое
			if (!this.WorkspaceStoreData.workspaces.length) {
				const newWorkspaceId = this.createWorkspace()
				this.addTabToWorkspace(modData, newWorkspaceId)

				// Устанавливаем эту вкладку как активную в новом рабочем пространстве
				const activeWs = this.WorkspaceStoreData.workspaces.find(
					(ws) => ws.id === newWorkspaceId
				)
				if (activeWs) {
					activeWs.activeFileTabId = modData.id
				}
			} else {
				// Проверяем, существует ли уже вкладка с таким ID или путем в активном рабочем пространстве
				const tabExists = this.activeWorkspace?.tabs.some(
					(tab) => tab.id === modData.id || tab.path === modData.path
				)

				if (!tabExists && this.activeWorkspace) {
					// Добавляем вкладку в активное рабочее пространство
					this.addTabToWorkspace(
						modData,
						this.WorkspaceStoreData.activeWorkspaceId
					)

					// Устанавливаем эту вкладку как активную в рабочем пространстве
					this.activeWorkspace.activeFileTabId = modData.id
				} else if (this.activeWorkspace) {
					// Если вкладка уже существует, делаем её активной
					const existingTab = this.activeWorkspace.tabs.find(
						(tab) =>
							tab.id === modData.id || tab.path === modData.path
					)
					if (existingTab) {
						this.activeWorkspace.activeFileTabId = existingTab.id
					}
				}
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

		// Запоминаем, была ли удаляемая вкладка активной
		const wasActiveTab =
			workspaceWithTab && workspaceWithTab.activeFileTabId === tabId

		// Сохраняем ссылку на последнюю вкладку перед удалением
		let lastTabId = ""
		if (
			workspaceWithTab &&
			wasActiveTab &&
			workspaceWithTab.tabs.length > 1
		) {
			// Находим ID вкладки, которая станет активной после удаления
			const tabIndex = workspaceWithTab.tabs.findIndex(
				(tab) => tab.id === tabId
			)
			const newActiveIndex =
				tabIndex === workspaceWithTab.tabs.length - 1
					? tabIndex - 1 // Если удаляем последнюю, берем предпоследнюю
					: tabIndex + 1 // Иначе берем следующую
			lastTabId = workspaceWithTab.tabs[newActiveIndex]?.id || ""
		}

		// Обновляем вкладки в рабочих пространствах
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				return {
					...ws,
					tabs: ws.tabs.filter((tab) => tab.id !== tabId)
				}
			})

		// После фильтрации проверяем, остались ли вкладки в рабочих пространствах
		// Удаляем пустые рабочие пространства
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.filter(
				(ws) => ws.tabs.length > 0
			)

		// Если после удаления не осталось рабочих пространств, сбрасываем активное
		if (this.WorkspaceStoreData.workspaces.length === 0) {
			this.WorkspaceStoreData.activeWorkspaceId = ""
			return
		}

		// Если было удалено активное рабочее пространство, делаем активным последнее оставшееся
		if (
			!this.WorkspaceStoreData.workspaces.some(
				(ws) => ws.id === this.WorkspaceStoreData.activeWorkspaceId
			)
		) {
			const lastWorkspace =
				this.WorkspaceStoreData.workspaces[
					this.WorkspaceStoreData.workspaces.length - 1
				]
			this.WorkspaceStoreData.activeWorkspaceId = lastWorkspace.id

			// Устанавливаем активную вкладку в новом активном рабочем пространстве
			if (lastWorkspace.tabs.length > 0) {
				lastWorkspace.activeFileTabId =
					lastWorkspace.tabs[lastWorkspace.tabs.length - 1].id
			}
			return
		}

		// Если в активном рабочем пространстве была удалена активная вкладка
		const activeWorkspace = this.activeWorkspace
		if (activeWorkspace && wasActiveTab) {
			if (activeWorkspace.tabs.length > 0) {
				if (lastTabId) {
					// Используем предварительно вычисленный ID следующей активной вкладки
					activeWorkspace.activeFileTabId = lastTabId
				} else {
					// Делаем активной последнюю вкладку
					activeWorkspace.activeFileTabId =
						activeWorkspace.tabs[activeWorkspace.tabs.length - 1].id
				}
			} else {
				// Это условие не должно выполниться, так как пустые рабочие пространства уже удалены
				activeWorkspace.activeFileTabId = ""
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

