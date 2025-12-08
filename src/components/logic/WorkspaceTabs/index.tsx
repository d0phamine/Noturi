import { Box, CloseButton, Tabs, useSlotRecipe } from "@chakra-ui/react"

import { FC, useState } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { ExplorerFileIcon } from "@/components"

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

	const [hoveredTabId, setHoveredTabId] = useState<string | null>(null)

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
							onMouseEnter={() => setHoveredTabId(tab.id)}
							onMouseLeave={() => setHoveredTabId(null)}
						>
							<Box css={tabsStyles.iconholder}>
								<ExplorerFileIcon fileName={tab.name} />
							</Box>
							{tab.name}
							{hoveredTabId === tab.id ||
							activeFileTab === tab.id ? (
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
							) : (
								<Box css={tabsStyles.placeholder} />
							)}
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

