import Editor from "@monaco-editor/react"

import { FC, useEffect, useRef } from "react"

import { observer } from "mobx-react-lite"
import { editor } from "monaco-editor"

import githubDarkTheme from "@/themes/GitHub Dark.json"
import githubLightTheme from "@/themes/GitHub Light.json"

import { useStores } from "@/store"

import { useColorMode } from "@/components/ui-chakra"

import { monacoEditorContainerRecipe } from "./style"

export const MonacoEditor: FC<{ workspaceId: string }> = observer(
	({ workspaceId }) => {
		const { WorkspaceStore } = useStores()
		const { colorMode } = useColorMode()

		// Получаем конкретный workspace по ID
		const workspace = WorkspaceStore.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === workspaceId
		)

		// Если этот workspace был удален, не рендерим ничего
		if (!workspace) {
			return <div className={monacoEditorContainerRecipe()}></div>
		}

		const activeWsTabId = workspace.activeWsTabId || ""
		const activeFile = workspace.tabs.find(
			(tab) => tab.id === activeWsTabId
		)

		// Храним ref на Editor для каждого workspace'а
		const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
		// Отслеживаем предыдущий файл, чтобы не обновлять лишний раз
		const previousFilePathRef = useRef<string>("")
		// Ref для отслеживания добавления action'а
		const actionAddedRef = useRef<boolean>(false)

		const handleEditorWillMount = (
			monaco: typeof import("monaco-editor")
		) => {
			monaco.editor.defineTheme(
				"githubDark",
				githubDarkTheme as editor.IStandaloneThemeData
			)
			monaco.editor.defineTheme(
				"githubLight",
				githubLightTheme as editor.IStandaloneThemeData
			)
		}

		useEffect(() => {
			if (!editorRef.current || actionAddedRef.current) {
				return
			}

			const editorInstance = editorRef.current

			const saveAction = editorInstance.addAction({
				id: `save-file`,
				label: "Save File",
				keybindings: [2048 | 49], // Ctrl/Cmd + S (KeyMod.CtrlCmd | KeyCode.KeyS)
				contextMenuGroupId: "navigation",
				run: () => {
					if (activeFile) {
						WorkspaceStore.saveFileTab(activeFile)
					}
				}
			})

			actionAddedRef.current = true

			// Cleanup функция для удаления action при размонтировании
			return () => {
				if (saveAction) {
					saveAction.dispose()
					actionAddedRef.current = false
				}
			}
		}, [editorRef.current, activeFile])

		// Обновляем содержимое editor при смене активного файла
		useEffect(() => {
			if (!editorRef.current || !activeFile) {
				return
			}

			const model = editorRef.current.getModel()
			if (!model) {
				return
			}

			// Если файл изменился (по пути, не по ID)
			if (previousFilePathRef.current !== activeFile.filePath) {
				// Чистая смена файла - переинициализируем модель
				model.setValue(activeFile.content)
				previousFilePathRef.current = activeFile.filePath
			}
		}, [activeFile?.filePath, activeFile?.id]) // Зависим от пути и ID

		// Обновляем только если содержимое активного файла изменилось (из других источников)
		useEffect(() => {
			if (!editorRef.current || !activeFile) {
				return
			}

			const model = editorRef.current.getModel()
			if (!model) {
				return
			}

			const currentContent = model.getValue()

			// Обновляем только если отличается от текущего в Editor'е
			// Это избегает сброса undo/redo истории при собственном редактировании
			if (currentContent !== activeFile.content) {
				model.setValue(activeFile.content)
			}
		}, [activeFile?.content])

		// Если нет активного файла, показываем пустой контейнер
		if (!activeFile) {
			return (
				<div
					className={monacoEditorContainerRecipe()}
					onClick={() =>
						WorkspaceStore.setActiveWorkspace(workspaceId)
					}
				></div>
			)
		}

		return (
			<div
				className={monacoEditorContainerRecipe()}
				onClick={() => WorkspaceStore.setActiveWorkspace(workspaceId)}
			>
				<Editor
					// НЕ используем key - Editor должен сохранять состояние при перерендере
					theme={colorMode === "dark" ? "githubDark" : "githubLight"}
					// Используем defaultValue только для первой инициализации
					defaultValue={activeFile.content}
					path={`${workspaceId}/${activeFile.filePath}`}
					beforeMount={handleEditorWillMount}
					onMount={(editorInstance) => {
						editorRef.current = editorInstance
						editorInstance.focus()
						previousFilePathRef.current = activeFile.filePath
					}}
					onChange={(newContent) => {
						if (newContent !== undefined) {
							WorkspaceStore.setFileChanged(
								newContent,
								workspaceId
							)
						}
					}}
					options={{
						automaticLayout: true,
						scrollBeyondLastLine: false,
						minimap: { enabled: false }
					}}
				/>
			</div>
		)
	}
)

