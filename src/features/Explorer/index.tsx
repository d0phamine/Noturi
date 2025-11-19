import { Accordion } from "@chakra-ui/react"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { AccordionExplorerItem } from "@/components"

import {
	explorerContentRecipe,
	explorerFooterRecipe,
	explorerHeaderRecipe,
	explorerRecipe
} from "./style"

export const Explorer: FC = observer(() => {
	return (
		<div data-component="explorer" className={explorerRecipe()}>
			<div
				data-component="explorer-header"
				className={explorerHeaderRecipe()}
			>
				<p>explorer</p>
			</div>
			<div
				data-component="explorer-content"
				className={explorerContentRecipe()}
			>
				<Accordion.Root collapsible size="sm" variant="subtle">
					<AccordionExplorerItem
						item={{ value: "open editors", title: "open editors" }}
					></AccordionExplorerItem>
					<AccordionExplorerItem
						item={{ value: "workspace", title: "workspace" }}
					></AccordionExplorerItem>
					<AccordionExplorerItem
						item={{ value: "timeline", title: "timeline" }}
					></AccordionExplorerItem>
				</Accordion.Root>
			</div>
			<div
				data-component="explorer-footer"
				className={explorerFooterRecipe()}
			></div>
		</div>
	)
})

