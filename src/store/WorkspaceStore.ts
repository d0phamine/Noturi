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
	activeWsTabId: string
}

export interface IWorkspaceStore {
	activeWsTabId: string
	workspaces: WorkspaceDataType[]
	activeWorkspaceId: string
	lastDeletedWsId: string
	expandedTreeIds: string[]
}

export class WorkspaceStore {
	public WorkspaceStoreData: IWorkspaceStore = {
		activeWsTabId: "",
		workspaces: [],
		activeWorkspaceId: "",
		lastDeletedWsId: "",
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
			activeWsTabId: ""
		})
		this.WorkspaceStoreData.activeWorkspaceId = newWorkspaceId
		return newWorkspaceId
	}

	get activeWorkspace(): WorkspaceDataType | undefined {
		return this.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === this.WorkspaceStoreData.activeWorkspaceId
		)
	}

	get activeWsTabId(): string {
		return this.activeWorkspace?.activeWsTabId || ""
	}

	get activeTab(): FileTabDataType | undefined {
		const workspace = this.activeWorkspace
		if (!workspace || !workspace.activeWsTabId) return undefined

		return workspace.tabs.find((tab) => tab.id === workspace.activeWsTabId)
	}

	public deleteEmptyWorkspace(): string {
		const removedWorkspaceIds: string = this.WorkspaceStoreData.workspaces
			.filter((ws) => ws.tabs.length === 0)
			.map((ws) => ws.id)[0]

		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.filter(
				(ws) => ws.tabs.length > 0
			)
		return removedWorkspaceIds
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
						activeWsTabId: tabId
					}
				}
				return ws
			})
	}

	public setActiveWorkspace = (workspaceId: string) => {
		this.WorkspaceStoreData.activeWorkspaceId = workspaceId
	}

	public addTabToWorkspace = (tab: FileTabDataType, workspaceId: string) => {
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === workspaceId) {
					return {
						...ws,
						tabs: [...ws.tabs, tab],
						// Set as active tab when it's the first tab added to the workspace
						activeWsTabId:
							ws.tabs.length === 0 ? tab.id : ws.activeWsTabId
					}
				}
				return ws
			})
	}

	public addFileTab = (
		name: string,
		id: string,
		metadata: FileTreeMetadata,
		content: string
	) => {
		if (!metadata.isDirectory) {
			const modData: FileTabDataType = {
				id: uuidv4(),
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
				this.setActiveFileTabIdInWorkspace(newWorkspaceId, modData.id)
			} else {
				const activeWorkspace = this.activeWorkspace

				if (activeWorkspace) {
					// Проверяем, существует ли уже вкладка с таким путем в активном рабочем пространстве
					const existingTab = activeWorkspace.tabs.find(
						(tab) => tab.path === modData.path
					)

					if (existingTab) {
						// Если вкладка уже существует, делаем её активной
						this.setActiveFileTabIdInWorkspace(
							activeWorkspace.id,
							existingTab.id
						)
					} else {
						// Добавляем вкладку в активное рабочее пространство
						this.addTabToWorkspace(modData, activeWorkspace.id)
						// Устанавливаем эту вкладку как активную в рабочем пространстве
						this.setActiveFileTabIdInWorkspace(
							activeWorkspace.id,
							modData.id
						)
					}
				}
			}
		}
	}

	public deleteFileTab = (tabId: string, workspaceId?: string) => {
		let workspaceWithTab

		if (workspaceId) {
			workspaceWithTab = this.WorkspaceStoreData.workspaces.find(
				(ws) =>
					ws.id === workspaceId &&
					ws.tabs.some((tab) => tab.id === tabId)
			)
		} else {
			workspaceWithTab = this.WorkspaceStoreData.workspaces.find((ws) =>
				ws.tabs.some((tab) => tab.id === tabId)
			)
		}

		if (!workspaceWithTab) return

		// Остальной код метода без изменений...
		const wasActiveTab = workspaceWithTab.activeWsTabId === tabId

		let lastTabId = ""
		if (wasActiveTab && workspaceWithTab.tabs.length > 1) {
			const tabIndex = workspaceWithTab.tabs.findIndex(
				(tab) => tab.id === tabId
			)
			const newActiveIndex =
				tabIndex === workspaceWithTab.tabs.length - 1
					? tabIndex - 1
					: tabIndex + 1
			lastTabId = workspaceWithTab.tabs[newActiveIndex]?.id || ""
		}

		// Удаляем вкладку из рабочего пространства
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === workspaceWithTab!.id) {
					return {
						...ws,
						tabs: ws.tabs.filter((tab) => tab.id !== tabId),
						activeWsTabId: wasActiveTab
							? lastTabId ||
								(ws.tabs.length > 1
									? ws.tabs.filter((t) => t.id !== tabId)[0]
											?.id
									: "")
							: ws.activeWsTabId
					}
				}
				return ws
			})

		this.WorkspaceStoreData.lastDeletedWsId = this.deleteEmptyWorkspace()

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
			if (lastWorkspace.tabs.length > 0 && !lastWorkspace.activeWsTabId) {
				this.setActiveFileTabIdInWorkspace(
					lastWorkspace.id,
					lastWorkspace.tabs[0].id
				)
			}
		}
	}

	public splitWorkspace = (tab: FileTabDataType) => {
		const newWsId = this.createWorkspace()
		this.addTabToWorkspace(tab, newWsId)
		this.setActiveFileTabIdInWorkspace(newWsId, tab.id)
	}

	public setFileChanged = (newContent: string, workspaceId?: string) => {
		// Если workspaceId не указан, используем ID активного рабочего пространства
		const targetWsId =
			workspaceId || this.WorkspaceStoreData.activeWorkspaceId

		// Находим указанное рабочее пространство
		const workspace = this.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === targetWsId
		)
		if (!workspace) return

		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === targetWsId) {
					return {
						...ws,
						tabs: ws.tabs.map((tab) => {
							if (tab.id === ws.activeWsTabId) {
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

	public setFileUnсhanged = (workspaceId?: string) => {
		const targetWsId =
			workspaceId || this.WorkspaceStoreData.activeWorkspaceId
		const workspace = this.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === targetWsId
		)
		if (!workspace) return

		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === targetWsId) {
					return {
						...ws,
						tabs: ws.tabs.map((tab) => {
							if (tab.id === ws.activeWsTabId) {
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
