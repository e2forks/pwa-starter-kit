import { ThunkAction } from "redux-thunk";

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { IState } from "../reducers/shop";
import { ActionCreator } from "redux";

export enum ActionTypes {
  GET_PRODUCTS = "GET_PRODUCTS",
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS",
  CHECKOUT_FAILURE = "CHECKOUT_FAILURE"
}
export type GET_PRODUCTS = {
  type: ActionTypes.GET_PRODUCTS;
  products: IProductMap;
};
export type ADD_TO_CART = {
  type: ActionTypes.ADD_TO_CART;
  productId: string | number;
};
export type REMOVE_FROM_CART = {
  type: ActionTypes.REMOVE_FROM_CART;
  productId: string | number;
};
export type CHECKOUT_SUCCESS = { type: ActionTypes.CHECKOUT_SUCCESS };
export type CHECKOUT_FAILURE = { type: ActionTypes.CHECKOUT_FAILURE };
export type ProductActions = ADD_TO_CART | REMOVE_FROM_CART;
export type Actions =
  | GET_PRODUCTS
  | ProductActions
  | CHECKOUT_SUCCESS
  | CHECKOUT_FAILURE;

export type ThunkActionCreator<R = void> = ActionCreator<
  ThunkAction<R, IState, undefined, Actions>
>;

export interface IProduct {
  id: string | number;
  title: string;
  price: number;
  inventory: number;
}
export interface IProductMap {
  [id: string]: IProduct;
}

const PRODUCT_LIST: IProduct[] = [
  {
    id: 1,
    title: "Cabot Creamery Extra Sharp Cheddar Cheese",
    price: 10.99,
    inventory: 2
  },
  {
    id: 2,
    title: "Cowgirl Creamery Mt. Tam Cheese",
    price: 29.99,
    inventory: 10
  },
  {
    id: 3,
    title: "Tillamook Medium Cheddar Cheese",
    price: 8.99,
    inventory: 5
  },
  { id: 4, title: "Point Reyes Bay Blue Cheese", price: 24.99, inventory: 7 },
  { id: 5, title: "Shepherd's Halloumi Cheese", price: 11.99, inventory: 3 }
];

export const getAllProducts: ThunkActionCreator = () => dispatch => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)

  // You could reformat the data in the right format as well:
  const products = PRODUCT_LIST.reduce(
    (obj: IProductMap, product) => {
      obj[product.id] = product;
      return obj;
    },
    {} as IProductMap
  );

  dispatch({
    type: ActionTypes.GET_PRODUCTS,
    products: products
  });
};

export const checkout: ThunkActionCreator = () => dispatch => {
  // Here you could do things like credit card validation, etc.
  // If that fails, dispatch CHECKOUT_FAILURE. We're simulating that
  // by flipping a coin :)
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    dispatch({
      type: ActionTypes.CHECKOUT_FAILURE
    });
  } else {
    dispatch({
      type: ActionTypes.CHECKOUT_SUCCESS
    });
  }
};

export const addToCart: ThunkActionCreator = (productId: string | number) => (
  dispatch,
  getState
) => {
  const state = getState();
  // Just because the UI thinks you can add this to the cart
  // doesn't mean it's in the inventory (user could've fixed it);
  if (state.shop.products[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const removeFromCart: ActionCreator<REMOVE_FROM_CART> = (
  productId: string | number
) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    productId
  };
};

export const addToCartUnsafe: ActionCreator<ADD_TO_CART> = (
  productId: string | number
) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    productId
  };
};
