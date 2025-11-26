import { ControlPanel, Explorer, FileSearch } from "@/features"
import { MainLayout } from "@/layouts"
import { Splitter, useSlotRecipe } from "@chakra-ui/react"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { mainPageRecipe, mainPageSplitterRecipe } from "./style"

export const MainPage: FC = observer(() => {
	const { CommonComponentStore } = useStores()

	const { controlPanelActiveEl } =
		CommonComponentStore.CommonComponentStoreData

	const splitterRecipe = useSlotRecipe({
		recipe: mainPageSplitterRecipe
	})
	const splitterStyle = splitterRecipe()

	return (
		<MainLayout>
			<div className={mainPageRecipe()} data-component="main-page">
				<ControlPanel />
				{controlPanelActiveEl ? (
					<Splitter.Root
						panels={[{ id: "leftExplorer" }, { id: "rightWindow" }]}
						borderWidth="1px"
						defaultSize={[45, 55]}
						css={splitterStyle.root}
					>
						<Splitter.Panel
							id="leftExplorer"
							css={splitterStyle.panel}
						>
							{controlPanelActiveEl === "explorer" ? (
								<Explorer />
							) : controlPanelActiveEl === "fileSearch" ? (
								<FileSearch />
							) : null}
						</Splitter.Panel>
						<Splitter.ResizeTrigger
							id="leftExplorer:rightWindow"
							css={splitterStyle.resizeTrigger}
						>
							<Splitter.ResizeTriggerSeparator
								css={splitterStyle.resizeTriggerSeparator}
							/>
						</Splitter.ResizeTrigger>
						<Splitter.Panel id="rightWindow">
							<div></div>
						</Splitter.Panel>
					</Splitter.Root>
				) : null}
			</div>
		</MainLayout>
	)
})

