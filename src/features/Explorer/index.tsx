import { FC } from "react"

import {
	explorerFooterRecipe,
	explorerHeaderRecipe,
	explorerRecipe
} from "./style"

export const Explorer: FC = () => {
	return (
		<div data-component="explorer" className={explorerRecipe()}>
			<div
				data-component="explorer-header"
				className={explorerHeaderRecipe()}
			>
				<p>explorer</p>
			</div>
			<div data-component="explorer-content"></div>
			<div
				data-component="explorer-footer"
				className={explorerFooterRecipe()}
			></div>
		</div>
	)
}
