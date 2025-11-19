import {
	Accordion,
	Button,
	TreeView,
	createTreeCollection
} from "@chakra-ui/react"

import { FC, useMemo } from "react"

import { ChevronRight, File, Folder } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { FileTree } from "@/store/FsStore"

import { AccordionExplorerItem } from "@/components"

import {
	explorerContentRecipe,
	explorerFooterRecipe,
	explorerHeaderRecipe,
	explorerRecipe
} from "./style"

export const Explorer: FC = observer(() => {
	const { FsStore } = useStores()

	const { selectedFileTree } = FsStore.FsStoreData

	const fileTree = useMemo(
		() =>
			createTreeCollection<FileTree>({
				nodeToValue: (node) => node.id,
				nodeToString: (node) => node.name,
				rootNode: {
					id: "root",
					name: "root",
					path: "/",
					isDirectory: true,
					children: selectedFileTree ?? []
				}
			}),
		[selectedFileTree]
	)

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
						{selectedFileTree ? (
							<TreeView.Root
								collection={fileTree}
								maxW="xs"
								size={"xs"}
								expandOnClick={false}
							>
								<TreeView.Tree
									css={{ "--tree-indentation": "2px" }}
								>
									<TreeView.Node
										indentGuide={
											<TreeView.BranchIndentGuide />
										}
										render={({ node, nodeState }) =>
											nodeState.isBranch ? (
												<TreeView.BranchControl>
													<TreeView.BranchTrigger>
														<TreeView.BranchIndicator
															asChild
														>
															<ChevronRight />
														</TreeView.BranchIndicator>
													</TreeView.BranchTrigger>
													<Folder />
													<TreeView.BranchText>
														{node.name}
													</TreeView.BranchText>
												</TreeView.BranchControl>
											) : (
												<TreeView.Item>
													<File />
													<TreeView.ItemText>
														{node.name}
													</TreeView.ItemText>
												</TreeView.Item>
											)
										}
									/>
								</TreeView.Tree>
							</TreeView.Root>
						) : (
							<Button
								size={"xs"}
								onClick={() => FsStore.setSelectedFolder()}
							>
								Select folder
							</Button>
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

