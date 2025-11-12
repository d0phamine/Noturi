import { type FC, type ReactNode } from "react"

import "./index.scss"

export interface IMainLayout {
	children: ReactNode
}

export const MainLayout: FC<IMainLayout> = ({ children }) => {
	return (
		<div className="layout-wrapper">
			<div className="main-layout">{children}</div>
		</div>
	)
}

