import { combineReducers } from "redux";
import { StoreType } from "../../types";
import cartReducer from "./CartReducer";
import currencyReducer from "./CurrencyReducer";
import userReducer from "./UserReducer";
import LoadingReducer from './LoadingReducer';
import searchReducer from "./searchReducer";
const rootReducer = combineReducers<StoreType>({
  // data: reducer
  currency: currencyReducer,
  cart: cartReducer,
  userSession: userReducer,
  loading: LoadingReducer,
  search: searchReducer,
});

export default rootReducer;
