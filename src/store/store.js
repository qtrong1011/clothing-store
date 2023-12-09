import { compose, createStore, applyMiddleware } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import { thunk } from "redux-thunk";


//Redux Persist Config to store reducers except userReducer in local storage
const persistConfig = {
    key: 'root',
    storage: storage,
    // blacklist: ['user'] //array not want to persist
    whitelist: ['cart']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

//Logger middleware from Redux
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean)

//Modify compose method to use Redux Devtool in CHROME ONLY
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer,undefined, composedEnhancers)

export const persistor = persistStore(store)