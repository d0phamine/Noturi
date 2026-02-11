import { makeAutoObservable } from "mobx"
import { v4 as uuidv4 } from "uuid"

export type FileTabDataType = {
	id: string // Уникальный ID вкладки (независимо от файла)
	filePath: string // Путь к файлу (может быть один для нескольких табов)
	fileName: string // Имя файла
	content: string
	originalContent: string
	changed: boolean
}

export type WorkspaceDataType = {
	id: string
	tabs: FileTabDataType[]
	activeWsTabId: string
	previousActiveTabId: string // Предыдущий активный таб для навигации при закрытии
	tabHistory: string[] // История активных табов [oldest ... newest]
}

export interface IWorkspaceStore {
	workspaces: WorkspaceDataType[]
	activeWorkspaceId: string
	lastDeletedWsId: string
	expandedTreeIds: string[]
}

export class WorkspaceStore {
	public WorkspaceStoreData: IWorkspaceStore = {
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
			activeWsTabId: "",
			previousActiveTabId: "",
			tabHistory: []
		})
		this.WorkspaceStoreData.activeWorkspaceId = newWorkspaceId
		return newWorkspaceId
	}

	get activeWorkspace(): WorkspaceDataType | undefined {
		return this.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === this.WorkspaceStoreData.activeWorkspaceId
		)
	}

	public deleteEmptyWorkspace = () => {
		const wasActiveWorkspaceDeleted =
			!this.WorkspaceStoreData.workspaces.some(
				(ws) =>
					ws.id === this.WorkspaceStoreData.activeWorkspaceId &&
					ws.tabs.length > 0
			)

		const emptyWorkspaces = this.WorkspaceStoreData.workspaces.filter(
			(ws) => ws.tabs.length === 0
		)
		if (emptyWorkspaces.length > 0) {
			// Сохраняем ID последнего пустого воркспейса
			this.WorkspaceStoreData.lastDeletedWsId =
				emptyWorkspaces[emptyWorkspaces.length - 1].id
		}

		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.filter(
				(ws) => ws.tabs.length > 0
			)

		// Если активный workspace был удален, выбираем первый оставшийся
		if (
			wasActiveWorkspaceDeleted &&
			this.WorkspaceStoreData.workspaces.length > 0
		) {
			this.WorkspaceStoreData.activeWorkspaceId =
				this.WorkspaceStoreData.workspaces[0].id
		}
	}

	public setActiveFileTabIdInWorkspace = (
		workspaceId: string,
		tabId: string
	) => {
		// Находим workspace по ID
		const workspace = this.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === workspaceId
		)

		// Убеждаемся, что таб действительно существует в этом workspace'е
		const tabExists = workspace?.tabs.some((tab) => tab.id === tabId)

		if (!workspace || !tabExists) {
			console.warn(
				`Cannot set active tab ${tabId} in workspace ${workspaceId}. Tab not found.`
			)
			return
		}

		// Обновляем ТОЛЬКО этот workspace, не трогая другие
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === workspaceId) {
					// Сохраняем предыдущий активный таб
					const previousTabId = ws.activeWsTabId

					// Добавляем новый таб в историю (удаляем если уже был, потом добавляем в конец)
					const newHistory = ws.tabHistory.filter(
						(id) => id !== tabId
					)
					newHistory.push(tabId)
					// Ограничиваем историю 50 табами
					if (newHistory.length > 10) {
						newHistory.shift()
					}

					return {
						...ws,
						activeWsTabId: tabId,
						previousActiveTabId: previousTabId,
						tabHistory: newHistory
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

						activeWsTabId:
							ws.tabs.length === 0 ? tab.id : ws.activeWsTabId
					}
				}
				return ws
			})
	}

	public deleteFileTab = (tabId: string, workspaceId?: string) => {
		// Находим workspace где находится таб
		const workspaceWithTab = this.WorkspaceStoreData.workspaces.find(
			(ws) => {
				if (workspaceId && ws.id !== workspaceId) return false
				return ws.tabs.some((tab) => tab.id === tabId)
			}
		)

		if (!workspaceWithTab) return

		// Проверяем был ли это активный таб
		const wasActiveTab = workspaceWithTab.activeWsTabId === tabId

		if (
			workspaceWithTab.tabs.length === 1 &&
			workspaceWithTab.tabs.some((tab) => tab.id === tabId)
		) {
			this.WorkspaceStoreData.lastDeletedWsId = workspaceWithTab.id
		}

		// Выбираем новый активный таб (если был удален активный)
		let newActiveTabId = ""

		if (wasActiveTab && workspaceWithTab.tabs.length > 1) {
			// Пытаемся перейти на предыдущий открытый таб из истории
			const historyWithoutDeleted = workspaceWithTab.tabHistory.filter(
				(id) => id !== tabId
			)
			if (historyWithoutDeleted.length > 0) {
				// Берем последний (самый свежий) таб из истории, кроме удаляемого
				newActiveTabId =
					historyWithoutDeleted[historyWithoutDeleted.length - 1]
			} else {
				// Если истории нет, выбираем первый таб в текущем workspace
				newActiveTabId =
					workspaceWithTab.tabs.find((tab) => tab.id !== tabId)?.id ||
					""
			}
		}

		// Удаляем таб и обновляем активный
		this.WorkspaceStoreData.workspaces =
			this.WorkspaceStoreData.workspaces.map((ws) => {
				if (ws.id === workspaceWithTab!.id) {
					const newTabHistory = ws.tabHistory.filter(
						(id) => id !== tabId
					)
					// Если это был активный таб, меняем на newActiveTabId, иначе оставляем прежний
					const updatedActiveTabId = wasActiveTab
						? newActiveTabId
						: ws.activeWsTabId
					return {
						...ws,
						tabs: ws.tabs.filter((tab) => tab.id !== tabId),
						activeWsTabId: updatedActiveTabId,
						tabHistory: newTabHistory,
						previousActiveTabId: ""
					}
				}
				return ws
			})

		// Удаляем пустые workspace'ы (это может поменять activeWorkspaceId)
		this.deleteEmptyWorkspace()

		// После удаления пустых workspace'ов, проверяем, что activeWorkspaceId валиден
		if (this.WorkspaceStoreData.workspaces.length > 0) {
			const activeWorkspaceExists =
				this.WorkspaceStoreData.workspaces.some(
					(ws) => ws.id === this.WorkspaceStoreData.activeWorkspaceId
				)
			if (!activeWorkspaceExists) {
				this.WorkspaceStoreData.activeWorkspaceId =
					this.WorkspaceStoreData.workspaces[0].id
				// Если в новом активном workspace'е есть табы, сделаем первый активным
				const newActiveWorkspace = this.WorkspaceStoreData.workspaces[0]
				if (newActiveWorkspace.tabs.length > 0) {
					this.setActiveFileTabIdInWorkspace(
						newActiveWorkspace.id,
						newActiveWorkspace.tabs[0].id
					)
				}
			} else if (newActiveTabId && wasActiveTab) {
				// Если нужно переключить активный таб, убедитесь что workspace содержит этот таб
				const workspaceWithNewTab =
					this.WorkspaceStoreData.workspaces.find((ws) =>
						ws.tabs.some((tab) => tab.id === newActiveTabId)
					)
				if (workspaceWithNewTab) {
					// Если таб находится в другом workspace, переключаемся на него
					if (
						workspaceWithNewTab.id !==
						this.WorkspaceStoreData.activeWorkspaceId
					) {
						this.WorkspaceStoreData.activeWorkspaceId =
							workspaceWithNewTab.id
					}
					// Устанавливаем этот таб активным
					this.setActiveFileTabIdInWorkspace(
						workspaceWithNewTab.id,
						newActiveTabId
					)
				}
			}
		} else {
			// Если нет workspace'ов, сбрасываем активный
			this.WorkspaceStoreData.activeWorkspaceId = ""
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

		// Находим указанное рабочое пространство
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
								const newChanged =
									tab.originalContent !== newContent
								return {
									...tab,
									content: newContent,
									originalContent: newContent,
									changed: newChanged
								}
							}
							return tab
						})
					}
				}
				return ws
			})
	}

	public setFileUnchanged = (workspaceId?: string) => {
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

