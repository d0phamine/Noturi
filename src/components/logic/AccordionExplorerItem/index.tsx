import { Accordion, useSlotRecipe } from "@chakra-ui/react"

import { FC } from "react"

import { accordionCustomItemRecipe } from "./style"

export type AccordionExplorerItemType = {
	value: string
	title: string
}

interface AccordionCustomItemProps {
	children?: React.ReactNode
	item: AccordionExplorerItemType
}

export const AccordionExplorerItem: FC<AccordionCustomItemProps> = ({
	children,
	item
}) => {
	const accordionRecipe = useSlotRecipe({ recipe: accordionCustomItemRecipe })
	const accordionStyles = accordionRecipe()

	return (
		<Accordion.Item
			key={item.value + item.title}
			value={item.value}
			css={accordionStyles.item}
		>
			<Accordion.ItemTrigger css={accordionStyles.itemTrigger}>
				<Accordion.ItemIndicator css={accordionStyles.itemIndicator} />
				{item.title}
			</Accordion.ItemTrigger>
			<Accordion.ItemContent css={accordionStyles.itemContent}>
				<Accordion.ItemBody css={accordionStyles.itemBody}>
					{children ? children : null}
				</Accordion.ItemBody>
			</Accordion.ItemContent>
		</Accordion.Item>
	)
}

