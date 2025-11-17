import { FC } from "react"

import { explorerRecipe } from "./style"

export const Explorer: FC = () => {
    return (
        <div data-component="explorer" className={explorerRecipe()}></div>
    )
}