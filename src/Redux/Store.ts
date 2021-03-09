import { combineReducers, createStore } from "redux";
import { hatsReducer } from './HatsState';
import { UserReducer } from './UserState';
// import { adidasReducer } from './AdidasState';
import { woolfitReducer } from './WoolfitItemsState';

const reducers = combineReducers({ /*adidasReducer,*/hatsReducer, woolfitReducer, UserReducer });
const store = createStore(reducers);

export default store;
