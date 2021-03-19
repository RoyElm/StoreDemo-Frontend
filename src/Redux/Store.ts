import { combineReducers, createStore } from "redux";
import { cartReducer } from "./CartState";
import { hatsReducer } from './HatsState';
import { AuthReducer } from './AuthState';
import { itemsReducer } from './ItemsState';

const reducers = combineReducers({ hatsState: hatsReducer, itemsState: itemsReducer, authState: AuthReducer, cartState: cartReducer });
const store = createStore(reducers);

export default store;
