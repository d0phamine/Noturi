import { FC } from "react"

import {
	explorerFooterRecipe,
	explorerHeaderRecipe,
	explorerRecipe
} from "@/features/Explorer/style"

export const FileSearch: FC = () => {
	return (
		<div data-component="fileSearch" className={explorerRecipe()}>
			<div
				data-component="fileSearch-header"
				className={explorerHeaderRecipe()}
			>
				<p>fileSearch</p>
			</div>
			<div data-component="fileSearch-content"></div>
			<div
				data-component="fileSearch-footer"
				className={explorerFooterRecipe()}
			></div>
		</div>
	)
}

