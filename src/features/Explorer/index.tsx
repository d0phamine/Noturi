import { WorkspaceTreeView } from "@/features"
import { Accordion, Button, useSlotRecipe } from "@chakra-ui/react"

import { FC } from "react"

import { observer } from "mobx-react-lite"

import { useStores } from "@/store"

import { AccordionExplorerItem } from "@/components"

import {
	explorerAccordionRootRecipe,
	explorerContentRecipe,
	explorerFooterRecipe,
	explorerHeaderRecipe,
	explorerAccordionWorkspaceButtonBlockRecipe,
	explorerRecipe
} from "./style"

export const Explorer: FC = observer(() => {
	const accordionRootRecipe = useSlotRecipe({
		recipe: explorerAccordionRootRecipe
	})
	const accordionRootStyles = accordionRootRecipe()
	const { FsStore } = useStores()

	const { selectedFileTree } = FsStore.FsStoreData

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
					css={accordionRootStyles.root}
				>
					<AccordionExplorerItem
						item={{ value: "open editors", title: "open editors" }}
					></AccordionExplorerItem>
					<AccordionExplorerItem
						item={{ value: "workspace", title: "workspace" }}
					>
						{selectedFileTree ? (
							<WorkspaceTreeView />
						) : (
							<div className={explorerAccordionWorkspaceButtonBlockRecipe()}>
								<Button
									size={"xs"}
									onClick={() => FsStore.setSelectedFolder()}
								>
									Select folder
								</Button>
							</div>
						)}
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

