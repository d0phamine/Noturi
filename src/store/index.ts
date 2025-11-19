import { createContext, useContext } from "react"

import { CommonComponentStore } from "./CommonComponentStore"

export const rootStoreContext = createContext({
	CommonComponentStore: new CommonComponentStore()
})

export const useStores = () => useContext(rootStoreContext)
