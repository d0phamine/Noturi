import { ControlPanel, Explorer } from "@/features"
import { MainLayout } from "@/layouts"

import { FC } from "react"

import { mainPageRecipe } from "./style"

export const MainPage: FC = () => {
	return (
		<MainLayout>
			<div className={mainPageRecipe()} data-component="main-page">
				<ControlPanel />
				<Explorer />
				<div></div>
			</div>
		</MainLayout>
	)
}

