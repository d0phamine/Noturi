import { makeAutoObservable } from "mobx"

export type ControlPanelActiveElType = "explorer" | "fileSearch" | null

export interface ICommonComponentStore {
	controlPanelActiveEl: ControlPanelActiveElType
}

export class CommonComponentStore {
	public CommonComponentStoreData: ICommonComponentStore = {
		controlPanelActiveEl: null,
	}

	constructor() {
		makeAutoObservable(this)
	}

	public setControlPanelActiveEl = (
		controlPanelActiveEl: ControlPanelActiveElType
	) => {
		this.CommonComponentStoreData.controlPanelActiveEl =
			controlPanelActiveEl
		console.log(controlPanelActiveEl)
	}
}

