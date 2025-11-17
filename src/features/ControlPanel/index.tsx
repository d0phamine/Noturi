import { IconButton, Tabs, useSlotRecipe } from "@chakra-ui/react"

import { FC } from "react"

import { Files, Search, Settings } from "lucide-react"

import {
	controlPanelFooter,
	controlPanelRecipe,
	controlPanelSettingsRecipe,
	controlPanelTabsRecipe
} from "./style"

export const ControlPanel: FC = () => {
	const tabsRecipe = useSlotRecipe({ recipe: controlPanelTabsRecipe })
	const tabsStyles = tabsRecipe()

	return (
		<div data-component="control-panel" className={controlPanelRecipe()}>
			<Tabs.Root
				variant="plain"
				defaultValue="files"
				orientation="vertical"
				size="sm"
				fitted={true}
				css={tabsStyles.root}
			>
				<Tabs.List css={tabsStyles.list}>
					<Tabs.Trigger value="files" css={tabsStyles.trigger}>
						<Files />
					</Tabs.Trigger>
					<Tabs.Trigger value="search" css={tabsStyles.trigger}>
						<Search />
					</Tabs.Trigger>
					<Tabs.Indicator css={tabsStyles.indicator} />
				</Tabs.List>
			</Tabs.Root>
			<IconButton
				aria-label="Settings"
				className={controlPanelSettingsRecipe()}
				variant="ghost"
				size={"xl"}
			>
				<Settings></Settings>
			</IconButton>
			<div
				data-component="control-panel-footer"
				className={controlPanelFooter()}
			></div>
		</div>
	)
}

