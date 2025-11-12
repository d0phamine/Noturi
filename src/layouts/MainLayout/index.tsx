import { type FC, type ReactNode } from "react"

import { layoutWrapperRecipe, mainLayoutRecipe } from "./style"

export interface IMainLayout {
	children: ReactNode
}

export const MainLayout: FC<IMainLayout> = ({ children }) => {
	return (
		<div className={layoutWrapperRecipe()} data-component="layout-wrapper">
			<div className={mainLayoutRecipe()} data-component="main-layout">
				{children}
			</div>
		</div>
	)
}

