import { Accordion, Button } from "@chakra-ui/react"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { AccordionExplorerItem } from "@/components"

import {
	explorerContentRecipe,
	explorerFooterRecipe,
	explorerHeaderRecipe,
	explorerRecipe
} from "./style"

export const Explorer: FC = observer(() => {
	const { FsStore } = useStores()

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
				<Accordion.Root
					collapsible
					size="sm"
					variant="subtle"
					defaultValue={["workspace"]}
					multiple
				>
					<AccordionExplorerItem
						item={{ value: "open editors", title: "open editors" }}
					></AccordionExplorerItem>
					<AccordionExplorerItem
						item={{ value: "workspace", title: "workspace" }}
					>
						<Button
							size={"xs"}
							onClick={() => FsStore.setSelectedFolder()}
						>
							Select folder
						</Button>
					</AccordionExplorerItem>
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

