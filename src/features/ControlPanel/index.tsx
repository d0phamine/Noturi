import { IconButton, Tabs, useSlotRecipe } from "@chakra-ui/react"

import { FC } from "react"

import { Files, Search, Settings } from "lucide-react"
import { observer } from "mobx-react-lite"

import { useStores } from "@/store"
import { ControlPanelActiveElType } from "@/store/CommonComponentStore"

import {
	controlPanelRecipe,
	controlPanelSettingsRecipe,
	controlPanelTabsRecipe
} from "./style"

export const ControlPanel: FC = observer(() => {
	const { CommonComponentStore } = useStores()
	const tabsRecipe = useSlotRecipe({ recipe: controlPanelTabsRecipe })
	const tabsStyles = tabsRecipe()

	return (
		<div data-component="control-panel" className={controlPanelRecipe()}>
			<Tabs.Root
				variant="plain"
				defaultValue=""
				orientation="vertical"
				size="sm"
				fitted={true}
				css={tabsStyles.root}
				onValueChange={(e) =>
					CommonComponentStore.setControlPanelActiveEl(
						e.value as ControlPanelActiveElType
					)
				}
				deselectable={true}
			>
				<Tabs.List css={tabsStyles.list}>
					<Tabs.Trigger
						value="explorer"
						css={tabsStyles.trigger}
					>
						<Files />
					</Tabs.Trigger>
					<Tabs.Trigger value="fileSearch" css={tabsStyles.trigger}>
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
		</div>
	)
})

