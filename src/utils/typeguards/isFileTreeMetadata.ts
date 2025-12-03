import { FileTreeMetadata } from "@/store/FsStore"

export const isFileTreeMetadata = (
	value: unknown
): value is FileTreeMetadata => {

	if (typeof value !== "object" || value === null) {
		return false
	}

	const obj = value as Record<string, unknown>

	return typeof obj.path === "string" && typeof obj.isDirectory === "boolean"
}

