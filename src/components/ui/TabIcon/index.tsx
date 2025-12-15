import { CloseButton } from "@chakra-ui/react"

import { FC, useState } from "react"

interface ITabIconProps {
	type: "close" | "unsaved"
	onClick?: (e: React.MouseEvent) => void
}

export const TabIcon: FC<ITabIconProps> = (props) => {
	const [hoveredTabIcon, setHoveredTabIcon] = useState<boolean>(false)
	return (
		<div
			data-component="tab-icon"
			onClick={(e) => {
				e.stopPropagation()
				props.onClick?.(e)
			}}
		>
			{props.type === "unsaved" ? (
				<div data-component="tab-icon-unsaved">
					{hoveredTabIcon ? (
						<CloseButton
							as="span"
							role="button"
							size="2xs"
							me="-2"
							onMouseLeave={() => setHoveredTabIcon(false)}
						/>
					) : (
						<div
							data-component="tab-icon__changeCircle"
							style={{
								width: "8px",
								height: "8px",
								marginLeft: "8px",
								borderRadius: "100%",
								background: "white"
							}}
							onMouseEnter={() => setHoveredTabIcon(true)}
						></div>
					)}
				</div>
			) : (
				<CloseButton as="span" role="button" size="2xs" me="-2" />
			)}
		</div>
	)
}

