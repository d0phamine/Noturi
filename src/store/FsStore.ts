import { open } from "@tauri-apps/plugin-dialog"
import { BaseDirectory, readDir } from "@tauri-apps/plugin-fs"

import { makeAutoObservable, runInAction } from "mobx"
import { v4 as uuidv4 } from "uuid"

export interface FileTree {
	id: string
	name: string
	path: string
	isDirectory: boolean
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
		const tree: FileTree[] = []

		for (const entry of entries) {
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
}

