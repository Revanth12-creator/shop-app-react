import { Action } from "redux";
import SearchActions from "../actions/searchAction";


type IAction = {
    data: string;
} & Action;
function searchReducer(store = "", action: IAction) {
    switch (action.type) {
        case SearchActions.ActionTypes.CHANGE_SEARCH:
            return action.data;
        default:
            return store;
    }
}
export default searchReducer;