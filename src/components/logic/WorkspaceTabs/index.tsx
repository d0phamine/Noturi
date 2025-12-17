import { Box, Tabs, useSlotRecipe } from "@chakra-ui/react"

import { FC, useEffect, useRef, useState } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTabDataType } from "@/store/WorkspaceStore"

import { ExplorerFileIcon, SimpleDialog, TabIcon } from "@/components"

import {
	workspaceTabsContainerRecipe,
	workspaceTabsListBorder,
	workspaceTabsRecipe
} from "./style"

export const WorkSpaceTabs: FC = observer(() => {
	const { WorkspaceStore, FsStore } = useStores()
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

	const tabIconHandler = (
		e: React.MouseEvent<Element, MouseEvent>,
		tab: FileTabDataType
	) => {
		e.stopPropagation()
		!tab.changed ? WorkspaceStore.deleteFileTab(tab.id) : null
	}

	const onSaveHandler = (tab: FileTabDataType) => {
		FsStore.writeFile(tab.path, tab.content)
			.then(() => {
				WorkspaceStore.setFileUnсhanged()
			})
			.catch((error) => {
				console.error("File save error", error)
			})
		WorkspaceStore.deleteFileTab(tab.id)
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
								<SimpleDialog
									onApprove={() => onSaveHandler(tab)}
									onCancel={() =>
										WorkspaceStore.deleteFileTab(tab.id)
									}
									title="Do you want to save the changes you made?"
									approveText="save"
									cancelText="no"
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
										<p>123123</p>
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
							fileTabs.length != 0 ? undefined : { bg: "noTabs" }
						)}
					></div>
				</Tabs.List>
			</Tabs.Root>
		</div>
	)
})

