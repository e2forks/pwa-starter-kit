import {
  Reducer,
  Store,
  ReducersMapObject,
  Action,
  AnyAction,
  StoreEnhancer,
  StoreEnhancerStoreCreator
} from "redux";

export interface ICombineReducers<S> {
  (reducers: ReducersMapObject<S, any>): Reducer<S>;
}

export interface ICombineReducers<S, A extends Action = AnyAction> {
  (reducers: ReducersMapObject<S, A>): Reducer<S, A>;
}

/**
  If you are lazy loading any connected elements, then these elements must be
  able to lazily install their reducers. This is a store enhancer that
  enables that.

  @example
  // Sample use (where you define your redux store, in store.js):
  import lazyReducerEnhancer from '../node_modules/pwa-helpers/lazy-reducer-enhancer.js';
  import someReducer from './reducers/someReducer.js';

  export const store = createStore(
    (state, action) => state,
    compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
  );

  Then, in your page/element, you can lazy load a specific reducer with:
  store.addReducers({
    someReducer
  });
*/
export declare function lazyReducerEnhancer<
  Ext,
  StateExt,
  S,
  A extends Action = AnyAction
>(
  combineReducers: ICombineReducers<S, A>
): (
  next: StoreEnhancerStoreCreator<Ext, StateExt>
) => StoreEnhancerStoreCreator<Ext & ILazyReducerStore<S, A>, StateExt>;

export interface ILazyReducerStore<S, A extends Action = AnyAction>
  extends Store<S, A> {
  addReducers(reducers: ReducersMapObject<S, A>): void;
}
