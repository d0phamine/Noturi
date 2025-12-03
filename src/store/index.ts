import { createContext, useContext } from "react"

import { CommonComponentStore } from "./CommonComponentStore"
import { FsStore } from "./FsStore"
import { WorkspaceStore } from "./WorkspaceStore"

export const rootStoreContext = createContext({
	CommonComponentStore: new CommonComponentStore(),
	WorkspaceStore: new WorkspaceStore(),
	FsStore: new FsStore()
})

export const useStores = () => useContext(rootStoreContext)

