import { createContext, useContext } from "react"

import { CommonComponentStore } from "./CommonComponentStore"
import { FsStore } from "./FsStore"

export const rootStoreContext = createContext({
	CommonComponentStore: new CommonComponentStore(),
	FsStore: new FsStore()
})

export const useStores = () => useContext(rootStoreContext)

