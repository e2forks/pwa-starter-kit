import { ActionCreator } from "redux";

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
export enum ActionTypes {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT"
}
export type INCREMENT = { type: ActionTypes.INCREMENT };
export type DECREMENT = { type: ActionTypes.DECREMENT };
export type Actions = INCREMENT | DECREMENT;

export const increment: ActionCreator<INCREMENT> = (): INCREMENT => {
  return { type: ActionTypes.INCREMENT };
};

export const decrement: ActionCreator<DECREMENT> = (): DECREMENT => {
  return { type: ActionTypes.DECREMENT };
};
