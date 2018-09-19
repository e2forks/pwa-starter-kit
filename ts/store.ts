/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

declare global {
  interface Window {
    process?: Object;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  AnyAction,
  Action,
  ReducersMapObject,
  Reducer
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import {
  lazyReducerEnhancer,
  ILazyReducerStore
} from "pwa-helpers/lazy-reducer-enhancer";

/** Interface extension to the redux store after applying redux-thunk and lazyReducerEnhancer. */
export interface IExStore<S, A extends Action = AnyAction>
  extends ILazyReducerStore<S, A> {
  dispatch: ThunkDispatch<S, undefined, A>;
}

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Initializes the Redux store with a lazyReducerEnhancer (so that you can
 * lazily add reducers after the store has been created) and redux-thunk (so
 * that you can dispatch async actions). See the "Redux and state management"
 * section of the wiki for more details:
 * https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management
 */
export const store = createStore(
  ((state: any) => state) as Reducer<any, AnyAction>,
  devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

/**
 * Utility function to lazy load reducers and returns
 * the redux store.
 *
 * @param reducers Object whose values correspond to different reducer functions.
 *
 * @template S The type of state held by this store.
 * @template A the type of actions which may be dispatched by this store.
 */
export const addReducers = <S, A extends Action = AnyAction>(
  reducers: ReducersMapObject<S, A>
) => {
  store.addReducers(reducers);
  return store as IExStore<S, A>;
};
