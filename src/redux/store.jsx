import { combineReducers, createStore } from "redux";
import announcementReducer from './announcementReducer.jsx';

const reducers = combineReducers({
    announcementReducer
});

const store = createStore(reducers);

export default store;