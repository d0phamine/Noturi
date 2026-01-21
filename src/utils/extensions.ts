import { fileIconMapping } from "@/components"

export const isMarkdownFile = (fileName: string): boolean => {
	if (!fileName) return false
	const ext = "." + fileName.split(".").pop()

	// Проверяем, существует ли объект extension и есть ли в нем нужное расширение
	if (!fileIconMapping.extension) return false

	const extensionValue = fileIconMapping.extension[ext]

	// Сравниваем компоненты напрямую
	return (
		extensionValue === fileIconMapping.extension[".md"] ||
		extensionValue === fileIconMapping.extension[".markdown"] ||
		extensionValue === fileIconMapping.extension[".mdx"]
	)
}
