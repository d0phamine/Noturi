import Editor from "@monaco-editor/react"

import { FC, useEffect, useRef } from "react"

import { observer } from "mobx-react-lite"
import { editor } from "monaco-editor"

import { useStores } from "@/store"

export const MonacoEditor: FC = observer(() => {
	const { FsStore, WorkspaceStore } = useStores()

	const { fileTabs, activeFileTabId } = WorkspaceStore.WorkspaceStoreData
	const activeFile = fileTabs.find((tab) => tab.id === activeFileTabId)

	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

	useEffect(() => {
		editorRef.current?.focus()
	}, [activeFile])

	return (
		<div style={{ height: "100%" }}>
			{fileTabs.length ? (
				<Editor
					key={activeFile?.id}
					height="100%"
					theme="vs-dark"
					value={activeFile?.content}
					path={activeFile?.path}
					onMount={(editor) => (editorRef.current = editor)}
					onChange={(newContent) =>
						WorkspaceStore.setFileChanged(newContent ?? "")
					}
				/>
			) : null}
		</div>
	)
})

