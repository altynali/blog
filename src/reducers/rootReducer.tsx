
import {combineReducers} from 'redux'
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage' 
import loginReducer from './loginReducer'
import articleReducer from './articleReducer'
import commentReducer from './commentReducer'
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'primary',
    storage,
}

const rootReducer = combineReducers({
    articleReducer,
    loginReducer,
    commentReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWare = applyMiddleware(thunk);
const store = createStore(persistedReducer, composeWithDevTools(middleWare));
const persistor = persistStore(store)

export {store, persistor};


export default rootReducer
export type RootState = ReturnType<typeof store.getState>
  
