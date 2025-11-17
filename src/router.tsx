import { MainPage } from "@/pages"

import { FC } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

import { Provider } from "./components/ui-chakra"

export const Router: FC = () => {
	return (
		<HashRouter>
			<Provider>
				<Routes>
					<Route path="/" element={<MainPage />} />
				</Routes>
			</Provider>
		</HashRouter>
	)
}

