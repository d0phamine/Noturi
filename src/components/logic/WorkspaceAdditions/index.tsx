import { IconButton } from "@chakra-ui/react"

import { FC } from "react"

import { Columns2, ScanEye } from "lucide-react"

import { workspaceAdditionsRecipe } from "./style"

export const WorkspaceAdditions: FC = () => {
	return (
		<div
			data-component="workspace-additions"
			className={workspaceAdditionsRecipe()}
		>
			<IconButton size={"2xs"} variant="ghost">
				<ScanEye></ScanEye>
			</IconButton>
			<IconButton size={"2xs"} variant="ghost">
				<Columns2></Columns2>
			</IconButton>
		</div>
	)
}

