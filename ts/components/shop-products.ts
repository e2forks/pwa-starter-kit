/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, property } from "@polymer/lit-element";
import { connect } from "pwa-helpers/connect-mixin";

// This element is connected to the Redux store.
import { store as defaultStore } from "../store";
import { IStore } from "./my-view3";
const store = defaultStore as IStore;

// These are the elements needed by this element.
import "./shop-item";

// These are the actions needed by this element.
import {
  getAllProducts,
  addToCart,
  IProductMap
} from "../actions/shop";

// These are the elements needed by this element.
import { addToCartIcon } from "./my-icons";

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from "./button-shared-styles";
import { IState } from "../reducers/shop";

class ShopProducts extends connect(store as IStore)(LitElement) {
  @property({ type: Object })
  _products!: IProductMap;

  render() {
    const { _products } = this;
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      ${Object.keys(_products).map(key => {
        const item = _products[key];
        return html`
          <div>
            <shop-item name="${item.title}" amount="${item.inventory}" price="${
          item.price
        }"></shop-item>
            <button
                ?disabled="${item.inventory === 0}"
                @click="${(e: MouseEvent) =>
                  store.dispatch(
                    addToCart((e.currentTarget as HTMLElement).dataset["index"] as string)
                  )}"
                data-index="${item.id}"
                title="${item.inventory === 0 ? "Sold out" : "Add to cart"}">
              ${item.inventory === 0 ? "Sold out" : addToCartIcon}
            </button>
          </div>
        `;
      })}
    `;
  }

  firstUpdated() {
    store.dispatch(getAllProducts());
  }

  // This is called every time something is updated in the store.
  _stateChanged(state: IState) {
    this._products = state.shop.products;
  }
}

window.customElements.define("shop-products", ShopProducts);
