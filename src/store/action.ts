import { UPDATE_CURRENT_IFRAME, UPDATE_CURRENT_IFRAME_URL } from "./actionType"

// 更新当前目录地址
export const updateCurrentIframe = (currentKey: string) => ({
    type: UPDATE_CURRENT_IFRAME,
    currentKey,
})

export const updateCurrentIframeUrl = (currentUrl: string) =>({
    type: UPDATE_CURRENT_IFRAME_URL,
})