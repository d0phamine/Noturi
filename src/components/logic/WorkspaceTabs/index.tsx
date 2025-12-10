import { Box, CloseButton, Tabs, useSlotRecipe } from "@chakra-ui/react"

import { FC, useEffect, useRef, useState } from "react"

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
	const activeTabRef = useRef<HTMLButtonElement>(null)

	const { fileTabs, activeFileTabId } = WorkspaceStore.WorkspaceStoreData

	const [hoveredTabId, setHoveredTabId] = useState<string | null>(null)

	useEffect(() => {
		if (activeTabRef.current) {
			activeTabRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
				inline: "nearest"
			})
		}
	}, [activeFileTabId])

	return (
		<div
			className={workspaceTabsContainerRecipe()}
			data-component="workspace-tabs-container"
		>
			<Tabs.Root
				defaultValue="members"
				variant="plain"
				css={tabsStyles.root}
				value={activeFileTabId}
				onValueChange={(e) =>
					WorkspaceStore.setActiveFileTabId(e.value)
				}
			>
				<Tabs.List css={tabsStyles.list}>
					{fileTabs?.map((tab) => (
						<Tabs.Trigger
							value={tab.id}
							css={tabsStyles.trigger}
							key={tab.id}
							onMouseEnter={() => setHoveredTabId(tab.id)}
							onMouseLeave={() => setHoveredTabId(null)}
							ref={
								activeFileTabId === tab.id ? activeTabRef : null
							}
						>
							<Box css={tabsStyles.iconholder}>
								<ExplorerFileIcon fileName={tab.name} />
							</Box>
							{tab.name}
							{hoveredTabId === tab.id ||
							activeFileTabId === tab.id ? (
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

