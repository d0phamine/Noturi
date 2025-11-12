import { MainPage } from "@/pages"

import { FC } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

export const Router: FC = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
			</Routes>
		</HashRouter>
	)
}

