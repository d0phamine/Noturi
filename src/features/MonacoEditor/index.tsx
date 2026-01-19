import Editor from "@monaco-editor/react"

import { FC, useEffect, useRef } from "react"

import { observer } from "mobx-react-lite"
import { editor } from "monaco-editor"

import githubDarkTheme from "@/themes/GitHub Dark.json"
import githubLightTheme from "@/themes/GitHub Light.json"

import { useStores } from "@/store"

import { useColorMode } from "@/components/ui-chakra"

import { monacoEditorContainerRecipe } from "./style"

export const MonacoEditor: FC = observer(() => {
	const { WorkspaceStore } = useStores()
	const { colorMode } = useColorMode()

	const { fileTabs, activeFileTabId } = WorkspaceStore.WorkspaceStoreData
	const activeFile = fileTabs.find((tab) => tab.id === activeFileTabId)

	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

	const handleEditorWillMount = (monaco: typeof import("monaco-editor")) => {
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
		editorRef.current?.focus()
	}, [activeFile])

	return (
		<div className={monacoEditorContainerRecipe()}>
			{fileTabs.length ? (
				<Editor
					key={activeFile?.id}
					theme={colorMode === "dark" ? "githubDark" : "githubLight"}
					value={activeFile?.content}
					path={activeFile?.path}
					beforeMount={handleEditorWillMount}
					onMount={(editor) => (editorRef.current = editor)}
					onChange={(newContent) =>
						WorkspaceStore.setFileChanged(newContent ?? "")
					}
				/>
			) : null}
		</div>
	)
})

