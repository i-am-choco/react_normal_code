import { MenuItem } from 'containers/home'
import { UPDATE_CURRENT_IFRAME } from './actionType'

export interface IHomePageManagerState {
    currentKey: string
    currentUrl: string

}

export const homePageManagerInitState = {
    currentKey: '0',
    currentUrl: 'http://localhost:8080/demo'
}

export interface IHomePageManagerAction {
    type: string
    currentKey: string
    currentUrl: string
}

const homePageManager = (state: IHomePageManagerState = homePageManagerInitState, action: IHomePageManagerAction) => {
    switch (action.type) {
        case UPDATE_CURRENT_IFRAME:
            return {
                ...state,
                currentKey: action.currentKey,
            }
        default:
            return state
    }
}

export default homePageManager
