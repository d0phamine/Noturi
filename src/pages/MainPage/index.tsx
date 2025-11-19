import { ControlPanel, Explorer, FileSearch } from "@/features"
import { MainLayout } from "@/layouts"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { mainPageRecipe } from "./style"

export const MainPage: FC = observer(() => {
	const { CommonComponentStore } = useStores()

	const { controlPanelActiveEl } =
		CommonComponentStore.CommonComponentStoreData

	return (
		<MainLayout>
			<div className={mainPageRecipe()} data-component="main-page">
				<ControlPanel />
				{controlPanelActiveEl === "explorer" ? (
					<Explorer />
				) : controlPanelActiveEl === "fileSearch" ? (
					<FileSearch />
				) : null}
			</div>
		</MainLayout>
	)
})

