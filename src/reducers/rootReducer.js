import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import { combineReducers } from "redux";

export default combineReducers({
  cartReducer,
  productReducer,
});
