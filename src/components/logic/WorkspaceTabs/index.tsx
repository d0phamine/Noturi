import { Box, Tabs, useSlotRecipe } from "@chakra-ui/react"

import { FC, useEffect, useRef, useState } from "react"

import { TriangleAlert } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTabDataType } from "@/store/WorkspaceStore"

import { ExplorerFileIcon, SimpleDialog, TabIcon } from "@/components"

import {
	workspaceTabsContainerRecipe,
	workspaceTabsListBorder,
	workspaceTabsRecipe
} from "./style"

interface WorkspaceTabsProps {
	workspaceId: string // Добавляем prop для передачи ID рабочего пространства
}

export const WorkspaceTabs: FC<WorkspaceTabsProps> = observer(
	({ workspaceId }) => {
		const { WorkspaceStore, FsStore } = useStores()
		const tabsRecipe = useSlotRecipe({ recipe: workspaceTabsRecipe })
		const tabsStyles = tabsRecipe()
		const activeTabRef = useRef<HTMLButtonElement>(null)
		const workspace = WorkspaceStore.WorkspaceStoreData.workspaces.find(
			(ws) => ws.id === workspaceId
		)
		const wsTabs = workspace?.tabs || []
		const activeWsTabId = workspace?.activeWsTabId || ""

		const [hoveredTabId, setHoveredTabId] = useState<string | null>(null)

		useEffect(() => {
			if (activeTabRef.current) {
				activeTabRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "center",
					inline: "nearest"
				})
			}
		}, [activeWsTabId])

		const tabIconHandler = (
			e: React.MouseEvent<Element, MouseEvent>,
			tab: FileTabDataType
		) => {
			e.stopPropagation()
			!tab.changed
				? WorkspaceStore.deleteFileTab(tab.id, workspaceId)
				: null
		}

		const onSaveHandler = (tab: FileTabDataType) => {
			FsStore.writeFile(tab.path, tab.content)
				.then(() => {
					WorkspaceStore.setFileUnсhanged(workspaceId)
					WorkspaceStore.deleteFileTab(tab.id, workspaceId)
				})
				.catch((error) => {
					console.error("File save error", error)
				})
		}

		return (
			<div
				className={workspaceTabsContainerRecipe()}
				data-component="workspace-tabs-container"
			>
				<Tabs.Root
					defaultValue="members"
					variant="plain"
					css={tabsStyles.root}
					value={activeWsTabId}
					onValueChange={(e) => {
						WorkspaceStore.setActiveWorkspace(workspaceId)
						WorkspaceStore.setActiveFileTabIdInWorkspace(
							workspaceId,
							e.value
						)
					}}
				>
					<Tabs.List css={tabsStyles.list}>
						{wsTabs?.map((tab) => (
							<Tabs.Trigger
								value={tab.id}
								css={tabsStyles.trigger}
								key={tab.id}
								onMouseEnter={() => setHoveredTabId(tab.id)}
								onMouseLeave={() => setHoveredTabId(null)}
								ref={
									activeWsTabId === tab.id
										? activeTabRef
										: null
								}
							>
								<Box css={tabsStyles.iconholder}>
									<ExplorerFileIcon fileName={tab.name} />
								</Box>
								{tab.name}
								{hoveredTabId === tab.id ||
								activeWsTabId === tab.id ? (
									<SimpleDialog
										onApprove={() => onSaveHandler(tab)}
										onCancel={() =>
											WorkspaceStore.deleteFileTab(tab.id, workspaceId)
										}
										title="Do you want to save the changes you made?"
										approveText="save"
										cancelText="no"
										titleIcon={<TriangleAlert />}
									>
										<SimpleDialog.Trigger>
											<TabIcon
												type={
													tab.changed
														? "unsaved"
														: "close"
												}
												onClick={(e) =>
													tabIconHandler(e, tab)
												}
											/>
										</SimpleDialog.Trigger>
										<SimpleDialog.Content>
											<p>
												Your changes will be lost if you
												don't save them.
											</p>
										</SimpleDialog.Content>
									</SimpleDialog>
								) : (
									<Box css={tabsStyles.placeholder} />
								)}
							</Tabs.Trigger>
						))}
						<div
							data-component="tabs-list-border"
							className={workspaceTabsListBorder(
								wsTabs.length != 0
									? undefined
									: { bg: "noTabs" }
							)}
						></div>
					</Tabs.List>
				</Tabs.Root>
			</div>
		)
	}
)

