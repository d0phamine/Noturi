import Editor from "@monaco-editor/react"

import { FC, useEffect, useRef, useState } from "react"

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

		// Keep a local copy of editor content to prevent it from being lost during re-renders
		const [editorContent, setEditorContent] = useState<string>("")

		const workspace = WorkspaceStore.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === workspaceId
		)
		const wsTabs = workspace?.tabs || []
		const activeWsTabId = workspace?.activeWsTabId || ""
		const activeFile = wsTabs.find((tab) => tab.id === activeWsTabId)

		const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

		// Update local content when active file changes
		useEffect(() => {
			if (activeFile) {
				setEditorContent(activeFile.content)
			} else {
				setEditorContent("")
			}
		}, [activeFile])

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
			if (editorRef.current) {
				editorRef.current.focus()

				// Ensure editor model is updated when switching between workspaces
				if (activeFile) {
					const model = editorRef.current.getModel()
					if (model) {
						model.setValue(activeFile.content)
					}
				}
			}
		}, [activeFile, workspaceId])

		// If there's no active file, don't render the editor
		if (!activeFile) {
			return <div className={monacoEditorContainerRecipe()}></div>
		}

		return (
			<div className={monacoEditorContainerRecipe()}>
				{wsTabs.length > 0 && activeFile ? (
					<Editor
						key={`${workspaceId}-${activeWsTabId}`}
						theme={
							colorMode === "dark" ? "githubDark" : "githubLight"
						}
						value={activeFile.content}
						path={activeFile.path}
						beforeMount={handleEditorWillMount}
						onMount={(editor) => {
							editorRef.current = editor
							editor.focus()
						}}
						onChange={(newContent) => {
							if (newContent !== undefined) {
								setEditorContent(newContent)
								WorkspaceStore.setFileChanged(
									newContent,
									workspaceId
								)
							}
						}}
						options={{
							// These options improve editor performance
							automaticLayout: true,
							scrollBeyondLastLine: false
						}}
					/>
				) : null}
			</div>
		)
	}
)
