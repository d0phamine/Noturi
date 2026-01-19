import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useSlotRecipe } from "@chakra-ui/react"

import {
	Children,
	FC,
	ReactElement,
	ReactNode,
	isValidElement,
	useState
} from "react"

import { simpleDialogRecipe } from "./style"

interface ISimpleDialogProps {
	onApprove: () => void
	onCancel: () => void
	title?: string
	approveText: string
	cancelText: string
	children: ReactNode
	titleIcon?: ReactNode
}

interface ISimpleDialogTriggerProps {
	children: ReactNode
}

interface ISimpleDialogContentProps {
	children: ReactNode
}

const SimpleDialogTrigger: FC<ISimpleDialogTriggerProps> = ({ children }) => {
	return <>{children}</>
}
SimpleDialogTrigger.displayName = "SimpleDialogTrigger"

const SimpleDialogContent: FC<ISimpleDialogContentProps> = ({ children }) => {
	return <>{children}</>
}
SimpleDialogContent.displayName = "SimpleDialogContent"

const SimpleDialogRoot: FC<ISimpleDialogProps> = (props) => {
	const [open, setOpen] = useState(false)
	const {
		onApprove,
		onCancel,
		title,
		approveText,
		cancelText,
		children,
		titleIcon
	} = props

	const childrenArray = Children.toArray(children) as ReactElement[]

	const triggerContent = childrenArray.find(
		(child): child is ReactElement<ISimpleDialogTriggerProps> =>
			isValidElement(child) && child.type === SimpleDialogTrigger
	)?.props.children

	const dialogContent = childrenArray.find(
		(child): child is ReactElement<ISimpleDialogContentProps> =>
			isValidElement(child) && child.type === SimpleDialogContent
	)?.props.children

	const dialogRecipe = useSlotRecipe({ recipe: simpleDialogRecipe })
	const dialogStyles = dialogRecipe()

	return (
		<Dialog.Root
			lazyMount
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
			closeOnEscape
		>
			<Dialog.Trigger asChild>{triggerContent}</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content css={dialogStyles.content}>
						<Dialog.Header css={dialogStyles.header}>
							{titleIcon}
							<Dialog.Title>{title}</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body css={dialogStyles.body}>
							{dialogContent}
						</Dialog.Body>
						<Dialog.Footer css={dialogStyles.footer}>
							<Button onClick={onCancel} size="2xs">
								{cancelText}
							</Button>
							<Button onClick={onApprove} size="2xs">
								{approveText}
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger
							asChild
							css={dialogStyles.closeTrigger}
						>
							<CloseButton size="2xs" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}

type SimpleDialogComponent = FC<ISimpleDialogProps> & {
	Trigger: FC<ISimpleDialogTriggerProps>
	Content: FC<ISimpleDialogContentProps>
}

export const SimpleDialog: SimpleDialogComponent = Object.assign(
	SimpleDialogRoot,
	{
		Trigger: SimpleDialogTrigger,
		Content: SimpleDialogContent
	}
)

