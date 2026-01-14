import { ControlPanel, Explorer, FileSearch, WorkSpace } from "@/features"
import { MainLayout } from "@/layouts"
import { Splitter, useSlotRecipe } from "@chakra-ui/react"

import { FC, useState } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import {
	mainPageFooterRecipe,
	mainPageRecipe,
	mainPageSplitterRecipe
} from "./style"

export const MainPage: FC = observer(() => {
	const { CommonComponentStore } = useStores()

	const { controlPanelActiveEl } =
		CommonComponentStore.CommonComponentStoreData

	const splitterRecipe = useSlotRecipe({
		recipe: mainPageSplitterRecipe
	})
	const splitterStyle = splitterRecipe()

	const [splitterSizes, setSplitterSizes] = useState([30, 70])

	return (
		<MainLayout>
			<div className={mainPageRecipe()} data-component="main-page">
				<ControlPanel />
				{controlPanelActiveEl ? (
					<Splitter.Root
						panels={[{ id: "leftExplorer" }, { id: "rightWindow" }]}
						size={splitterSizes}
						onResize={(details) => setSplitterSizes(details.size)}
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
						<Splitter.Panel
							id="rightWindow"
							css={splitterStyle.panel}
						>
							<WorkSpace />
						</Splitter.Panel>
					</Splitter.Root>
				) : null}
			</div>
			<div className={mainPageFooterRecipe()}></div>
		</MainLayout>
	)
})

