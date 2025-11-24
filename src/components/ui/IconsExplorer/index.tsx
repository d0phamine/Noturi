import { Icon } from "@chakra-ui/react"
import * as SvglIcons from "@ridemountainpig/svgl-react"

import type { FC, SVGProps } from "react"

import {
	ChevronDown,
	ChevronRight,
	File,
	Folder,
	FolderOpen
} from "lucide-react"

export const FolderExplorerIcon: FC<{ isOpen: boolean }> = ({ isOpen }) =>
	isOpen ? <FolderOpen /> : <Folder />

export const ChevronExplorerIcon: FC<{ isOpen: boolean }> = ({ isOpen }) =>
	isOpen ? <ChevronDown /> : <ChevronRight />

export const FileExplorerIcon: FC = () => <File />

