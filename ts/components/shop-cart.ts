/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/// <reference path="./my-view3.ts" />

import { LitElement, html, property } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin.js";

// This element is connected to the Redux store.
import { store } from "../store";
import { IStore } from "./my-view3";

// These are the elements needed by this element.
import { removeFromCartIcon } from "./my-icons.js";
import "./shop-item.js";

// These are the actions needed by this element.
import { removeFromCart } from "../actions/shop.js";

// These are the reducers needed by this element.
import {
  cartItemsSelector,
  cartTotalSelector,
  ICartProduct,
  IState
} from "../reducers/shop.js";

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from "./button-shared-styles.js";

class ShopCart extends connect(store as IStore)(LitElement) {
  @property({type: Array})
  _items: ICartProduct[] = [];

  @property({type: Number})
  _total: number = 0;

  render() {
    const { _items, _total } = this;
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      <p hidden="${_items.length !== 0}">Please add some products to cart.</p>
      ${_items.map(
        item =>
          html`
          <div>
            <shop-item name="${item.title}" amount="${item.amount}" price="${
            item.price
          }"></shop-item>
            <button
                @click="${(e: MouseEvent) =>
                  store.dispatch(
                    removeFromCart(
                      (e.currentTarget as HTMLElement).dataset["index"] as string
                    )
                  )}"
                data-index="${item.id}"
                title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
        `
      )}
      <p hidden="${!_items.length}"><b>Total:</b> ${_total}</p>
    `;
  }

  // This is called every time something is updated in the store.
  _stateChanged(state: IState) {
    this._items = cartItemsSelector(state);
    this._total = cartTotalSelector(state);
  }
}

window.customElements.define("shop-cart", ShopCart);
