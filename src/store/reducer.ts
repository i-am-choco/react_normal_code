import { combineReducers } from "@reduxjs/toolkit";
import homePageManager, { IHomePageManagerAction, IHomePageManagerState } from "./homePageManager";

type rootState = {
    homePageManager: IHomePageManagerState;
  };
  
 type rootAction = IHomePageManagerAction;
export default combineReducers<rootState, rootAction>({
    homePageManager,
})
