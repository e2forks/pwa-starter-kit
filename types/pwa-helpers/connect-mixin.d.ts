import { Store, Action, AnyAction } from "redux";
export { Store } from "redux";
/**
  Mixin for connecting an element to the Redux store; implements the
  basic store-connection boilerplate.

  @template B the interface to the base element which will be connected to the redis store.
  
  @template C the interface to the resultant element that is connected to the redis store.

  @template S the type of state held by the redux store.

  @template A the type of action which may be dispatch by the redux store.

  @example
  import { connect } from '../node_modules/pwa-helpers/connect-mixin.js';

  class MyElement extends connect(store)(HTMLElement) {
    // ...

    _stateChanged(state) {
      this.count = state.data.count;
    }
  }
*/
export declare function connect<S, A extends Action, AnyStore extends Store<S,A>>(
  store: AnyStore
): <B, C extends IElementWithReduxStore<S>>(baseElement: B) => C;

/**
 * Interface to the resultant element that is connected to the redis store.
 *
 * @template S the type of state held by the redux store.
 */
export interface IElementWithReduxStore<S> {
  new (): IElementWithReduxStore<S>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  _stateChanged(state: S): void;
  __storeUnsubscribe(): void;
}
