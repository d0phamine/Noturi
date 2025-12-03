import { Tabs, useSlotRecipe } from "@chakra-ui/react"
import { CloseButton } from "@chakra-ui/react"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import {
	workspaceTabsContainerRecipe,
	workspaceTabsListBorder,
	workspaceTabsRecipe
} from "./style"

export const WorkSpaceTabs: FC = observer(() => {
	const { WorkspaceStore } = useStores()
	const tabsRecipe = useSlotRecipe({ recipe: workspaceTabsRecipe })
	const tabsStyles = tabsRecipe()

	const { fileTabs, activeFileTab } = WorkspaceStore.WorkspaceStoreData

	console.log(fileTabs)

	return (
		<div
			className={workspaceTabsContainerRecipe()}
			data-component="workspace-tabs-container"
		>
			<Tabs.Root
				defaultValue="members"
				variant="plain"
				css={tabsStyles.root}
				value={activeFileTab}
				onValueChange={(e) => WorkspaceStore.setActiveFileTab(e.value)}
			>
				<Tabs.List css={tabsStyles.list}>
					{fileTabs?.map((tab) => (
						<Tabs.Trigger
							value={tab.id}
							css={tabsStyles.trigger}
							key={tab.id}
						>
							{tab.name}
							{activeFileTab === tab.id ? (
								<CloseButton
									as="span"
									role="button"
									size="2xs"
									me="-2"
									onClick={(e) => {
										e.stopPropagation()
										WorkspaceStore.deleteFileTab(tab.id)
									}}
								/>
							) : null}
						</Tabs.Trigger>
					))}
					<div
						data-component="tabs-list-border"
						className={workspaceTabsListBorder(
							fileTabs.length != 0 ? undefined : { bg: "noTabs" }
						)}
					></div>
				</Tabs.List>
			</Tabs.Root>
		</div>
	)
})

