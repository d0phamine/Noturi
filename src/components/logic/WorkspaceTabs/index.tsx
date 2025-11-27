import { Tabs, useSlotRecipe } from "@chakra-ui/react"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { workspaceTabsContainerRecipe, workspaceTabsRecipe, workspaceTabsListBorder } from "./style"

export const WorkSpaceTabs: FC = observer(() => {
	const tabsRecipe = useSlotRecipe({ recipe: workspaceTabsRecipe })
	const tabsStyles = tabsRecipe()

	return (
		<div
			className={workspaceTabsContainerRecipe()}
			data-component="workspace-tabs-container"
		>
			<Tabs.Root
				defaultValue="members"
				variant="plain"
				css={tabsStyles.root}
			>
				<Tabs.List css={tabsStyles.list}>
					<Tabs.Trigger value="members" css={tabsStyles.trigger}>
						Members
					</Tabs.Trigger>
					<Tabs.Trigger value="projects" css={tabsStyles.trigger}>
						Projects
					</Tabs.Trigger>
                    <div data-component="tabs-list-border" className={workspaceTabsListBorder()}></div>
				</Tabs.List>
			</Tabs.Root>
		</div>
	)
})

