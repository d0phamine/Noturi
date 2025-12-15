import { sortFileTreeByAlphabet } from "@/utils"
import { open } from "@tauri-apps/plugin-dialog"
import { open as openFs, readDir, writeTextFile } from "@tauri-apps/plugin-fs"

import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuidv4 } from "uuid"

export interface FileTreeMetadata {
	path: string
	isDirectory: boolean
}

export interface FileTree extends FileTreeMetadata {
	id: string
	name: string
	children?: FileTree[]
}

export interface IFsStore {
	selectedPath: string | null
	selectedFileTree: FileTree[] | null
}

export class FsStore {
	public FsStoreData: IFsStore = {
		selectedPath: null,
		selectedFileTree: null
	}

	constructor() {
		makeAutoObservable(this)
	}

	/**
	 * Recursive function for setting folder tree for selected folder
	 * @param {string} path - The path to the directory to read.
	 * @private
	 */

	private setSelectedFolderTree = async (
		path: string
	): Promise<FileTree[]> => {
		const entries = await readDir(path)

		const sortedDirs = entries
			.filter((elem) => elem.isDirectory)
			.sort((a, b) => sortFileTreeByAlphabet(a, b))
		const sortedFiles = entries
			.filter((elem) => !elem.isDirectory)
			.sort((a, b) => sortFileTreeByAlphabet(a, b))

		const sortedAlphabetArr = sortedDirs.concat(sortedFiles)
		const tree: FileTree[] = []

		for (const entry of sortedAlphabetArr) {
			const fullPath = `${path}/${entry.name}`

			const node: FileTree = {
				id: uuidv4(),
				name: entry.name,
				path: fullPath,
				isDirectory: entry.isDirectory
			}

			if (entry.isDirectory) {
				node.children = await this.setSelectedFolderTree(fullPath)
			}

			tree.push(node)
		}

		return tree
	}

	/**
	 * Function for setting active folder and create FileTree for FileExplorer
	 * @public
	 */

	public setSelectedFolder = async () => {
		try {
			const path = await open({
				multiple: false,
				directory: true,
				recursive: true
			})
			console.log(path, "path")
			if (path) {
				const tree = await this.setSelectedFolderTree(path)
				runInAction(() => {
					this.FsStoreData.selectedPath = path
					this.FsStoreData.selectedFileTree = tree
					console.log(tree)
				})
			}
		} catch (error) {
			console.error(error)
		}
	}

	public readFile = async (fileMetadata: FileTreeMetadata) => {
		if (!fileMetadata.isDirectory) {
			const file = await openFs(fileMetadata.path, {
				append: true,
				write: true
			})
			const stat = await file.stat()
			const buf = new Uint8Array(stat.size)
			await file.read(buf)
			const textContents = new TextDecoder().decode(buf)
			return textContents
		}
	}

	public writeFile = async (filePath: string, content: string) => {
		await writeTextFile(filePath, content)
	}
}

