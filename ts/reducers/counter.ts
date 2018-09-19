/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { Reducer } from "redux";
import { ActionTypes, Actions } from "../actions/counter";

export interface ICounterState {
  clicks: number;
  value: number;
}
export interface IState {
  counter: ICounterState;
}

const counter: Reducer<ICounterState, Actions> = (
  state = { clicks: 0, value: 0 },
  action
) => {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        clicks: state.clicks + 1,
        value: state.value + 1
      };
    case ActionTypes.DECREMENT:
      return {
        clicks: state.clicks + 1,
        value: state.value - 1
      };
    default:
      return state;
  }
};

export default counter;
