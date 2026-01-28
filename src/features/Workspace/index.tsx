import { Splitter, useSlotRecipe, useSplitter } from "@chakra-ui/react"

import { FC, Fragment, useEffect, useRef, useState } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { WorkspaceContent } from "@/components"

import { mainPageSplitterRecipe } from "@/pages/MainPage/style"

import { workspaceSplitContainerRecipe } from "./style"

export const WorkSpace: FC = observer(() => {
	const { WorkspaceStore } = useStores()

	const { workspaces, lastDeletedWsId } = WorkspaceStore.WorkspaceStoreData
	const activeWorkspace = WorkspaceStore.activeWorkspace

	const splitterRecipe = useSlotRecipe({
		recipe: mainPageSplitterRecipe
	})
	const splitterStyle = splitterRecipe()

	const prevWorkspacesCountRef = useRef<number>(0)
	const distributeSizes = (count: number): number[] =>
		Array(count).fill(100 / count)

	const redistributeSizesForNewPanel = (
		currentSizes: number[],
		newPanelCount: number
	): number[] => {
		const totalSize = calculateTotalSize(currentSizes)
		const newPanelSize = totalSize / newPanelCount

		// Reduce existing panels proportionally to make room for the new panel
		const adjustedSizes = currentSizes.map((size) => {
			const proportion = size / totalSize
			return size - newPanelSize * proportion
		})

		adjustedSizes.push(newPanelSize)
		return adjustedSizes
	}

	const redistributeSizesAfterRemoval = (
		currentSizes: number[],
		indexToRemove: number
	): number[] => {
		const removedSize = currentSizes[indexToRemove] || 0
		const remainingSizes = currentSizes.filter(
			(_, i) => i !== indexToRemove
		)
		const totalRemainingSize = calculateTotalSize(remainingSizes)

		// Distribute removed panel's size proportionally to remaining panels
		return remainingSizes.map(
			(size) => size + (removedSize * size) / totalRemainingSize
		)
	}

	const calculateTotalSize = (sizes: number[]): number =>
		sizes.reduce((sum, size) => sum + size, 0)

	const [panelIds, setPanelIds] = useState<string[]>([])
	const [splitterSizes, setSplitterSizes] = useState<number[]>([])

	const splitterConfig = useSplitter({
		panels: panelIds.map((id: string) => ({ id, minSize: 15 })),
		size: splitterSizes,
		orientation: "horizontal",
		onResize: (details) => {
			setSplitterSizes(details.size)
		}
	})

	const panels = splitterConfig
		.getItems()
		.filter((panel) => workspaces.some((ws) => ws.id === panel.id))

	useEffect(() => {
		const currentWorkspacesCount = workspaces.length
		console.log(workspaces.length)

		if (
			prevWorkspacesCountRef.current === 0 &&
			currentWorkspacesCount > 0
		) {
			setPanelIds(workspaces.map((ws) => ws.id))
			console.log(workspaces)
			console.log(panelIds)
			setSplitterSizes(distributeSizes(currentWorkspacesCount))
		}

		if (prevWorkspacesCountRef.current !== currentWorkspacesCount) {
			if (currentWorkspacesCount > prevWorkspacesCountRef.current) {
				const newSizes = redistributeSizesForNewPanel(
					splitterSizes,
					panelIds.length + 1
				)
				setSplitterSizes(newSizes)
				setPanelIds([...panelIds, activeWorkspace?.id || ""])
			}

			if (currentWorkspacesCount < prevWorkspacesCountRef.current) {
				const indexToRemove = panelIds.indexOf(lastDeletedWsId)
				const newSizes = redistributeSizesAfterRemoval(
					splitterSizes,
					indexToRemove
				)
				setSplitterSizes(newSizes)
				setPanelIds(
					panelIds.filter(
						(panelId: string) => panelId !== lastDeletedWsId
					)
				)
			}
		}
		prevWorkspacesCountRef.current = currentWorkspacesCount
	}, [workspaces, lastDeletedWsId, activeWorkspace])

	return (
		<div
			data-component="workspace-split-container"
			className={workspaceSplitContainerRecipe()}
		>
			<Splitter.RootProvider
				value={splitterConfig}
				css={splitterStyle.root}
			>
				{panels.map((panel) => (
					<Fragment key={panel.id}>
						{panel.type === "panel" && (
							<Splitter.Panel
								id={panel.id}
								css={splitterStyle.panel}
							>
								{workspaces.some(
									(ws) => ws.id === panel.id
								) && (
									<WorkspaceContent workspaceId={panel.id} />
								)}
							</Splitter.Panel>
						)}
						{panel.type === "handle" && (
							<Splitter.ResizeTrigger id={panel.id} />
						)}
					</Fragment>
				))}
			</Splitter.RootProvider>
		</div>
	)
})

