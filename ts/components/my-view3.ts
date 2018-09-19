/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, property } from "@polymer/lit-element";
import { PageViewElement } from "./page-view-element";
import { connect } from "pwa-helpers/connect-mixin";

// This element is connected to the Redux store.
import { addReducers } from "../store";

// These are the actions needed by this element.
import { checkout } from "../actions/shop";

// We are lazy loading its reducer.
import shop, { cartQuantitySelector, IState } from "../reducers/shop";
const store = addReducers({ shop });
export type IStore = typeof store;

// These are the elements needed by this element.
import "./shop-products";
import "./shop-cart";

// These are the shared styles needed by this element.
import { SharedStyles } from "./shared-styles";
import { ButtonSharedStyles } from "./button-shared-styles";
import { addToCartIcon } from "./my-icons";

class MyView3 extends connect(store)(PageViewElement) {
  @property({type: Number})
  _quantity: number = 0;

  @property({type: String})
  _error: string = '';

  render() {
    const { _quantity, _error } = this;
    return html`
      ${SharedStyles}
      ${ButtonSharedStyles}
      <style>
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }
        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }
        .cart, .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }
        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }
      </style>

      <section>
        <h2>Redux example: shopping cart</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${_quantity}</div></div>
        <p>This is a slightly more advanced Redux example, that simulates a
          shopping cart: getting the products, adding/removing items to the
          cart, and a checkout action, that can sometimes randomly fail (to
          simulate where you would add failure handling). </p>
        <p>This view, as well as its 2 child elements, <code>&lt;shop-products&gt;</code> and
        <code>&lt;shop-cart&gt;</code> are connected to the Redux store.</p>
      </section>
      <section>
        <h3>Products</h3>
        <shop-products></shop-products>

        <br>
        <h3>Your Cart</h3>
        <shop-cart></shop-cart>

        <div>${_error}</div>
        <br>
        <p>
          <button ?hidden="${_quantity == 0}"
              @click="${() => store.dispatch(checkout())}">
            Checkout
          </button>
        </p>
      </section>
    `;
  }

  // This is called every time something is updated in the store.
  _stateChanged(state: IState) {
    this._quantity = cartQuantitySelector(state);
    this._error = state.shop.error || this._error;
  }
}

window.customElements.define("my-view3", MyView3);
