import { applyMiddleware, combineReducers, createStore, compose, Action } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ThunkAction } from 'redux-thunk';

import profileReducer from './profileReducer';
import messagesReducer from './messageReducer';
import sideBarReducer from './sideBarReducer';
import usersReducer from './usersReducer';
import authReducer from './AuthReducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './appReducer';

let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never;
 
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

//@ts-ignore
window.store = store;

export default store;
