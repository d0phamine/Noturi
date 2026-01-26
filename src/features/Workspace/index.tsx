import { FC } from "react"

import { observer } from "mobx-react-lite"

import { WorkspaceContent } from "@/components"

export const WorkSpace: FC = observer(() => {
	return <WorkspaceContent />
})

