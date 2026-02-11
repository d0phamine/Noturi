import { createContext, useContext } from "react"

import { CommonComponentStore } from "./CommonComponentStore"
import { FsStore } from "./FsStore"
import { WorkspaceStore } from "./WorkspaceStore"

const fsStore = new FsStore()
const workspaceStore = new WorkspaceStore(fsStore)

export const rootStoreContext = createContext({
	CommonComponentStore: new CommonComponentStore(),
	WorkspaceStore: workspaceStore,
	FsStore: fsStore
})

export const useStores = () => useContext(rootStoreContext)

