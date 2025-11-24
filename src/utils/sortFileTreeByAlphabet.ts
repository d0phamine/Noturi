import { DirEntry } from "@tauri-apps/plugin-fs"

/**
 * Function for sorting dirs and files separataly by alphabet
 * @param {DirEntry} a
 * @param {DirEntry} b
 * @private
 */

export const sortFileTreeByAlphabet = (a: DirEntry, b: DirEntry) => {
	const nameA = a.name.toLowerCase()
	const nameB = b.name.toLowerCase()
	if (nameA && nameB) {
		if (nameA < nameB) return -1
		if (nameA > nameB) return 1
	}

	return 0
}
