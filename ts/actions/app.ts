/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { ThunkAction } from "redux-thunk";
import { IState } from "../reducers/app";
import { ActionCreator } from "redux";

export enum ActionTypes {
  UPDATE_DRAWER_STATE = "UPDATE_DRAWER_STATE",
  UPDATE_VIEW = "UPDATE_VIEW",
  UPDATE_OFFLINE = "UPDATE_OFFLINE",
  OPEN_SNACKBAR = "OPEN_SNACKBAR",
  CLOSE_SNACKBAR = "CLOSE_SNACKBAR"
}

export enum View {
  view1 = "view1",
  view2 = "view2",
  view3 = "view3",
  view404 = "view404"
}

export type UPDATE_DRAWER_STATE = {
  type: ActionTypes.UPDATE_DRAWER_STATE;
  opened: boolean;
};
export type UPDATE_VIEW = { type: "UPDATE_VIEW"; view: View };
export type UPDATE_OFFLINE = {
  type: "UPDATE_OFFLINE";
  offline: boolean;
};
export type OPEN_SNACKBAR = { type: "OPEN_SNACKBAR" };
export type CLOSE_SNACKBAR = { type: "CLOSE_SNACKBAR" };
export type Actions =
  | UPDATE_DRAWER_STATE
  | UPDATE_VIEW
  | UPDATE_OFFLINE
  | OPEN_SNACKBAR
  | CLOSE_SNACKBAR;

export type ThunkActionCreator<R = void> = ActionCreator<
  ThunkAction<R, IState, undefined, Actions>
>;

export const navigate: ThunkActionCreator = (path: string) => {
  return dispatch => {
    // Extract the page name from path.
    const view = path === "/" ? "view1" : path.slice(1);

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadView(view as View));

    // Close the drawer - in case the *path* change came from a link in the drawer.
    dispatch(updateDrawerState(false));
  };
};

const updateView: ActionCreator<UPDATE_VIEW> = (view: View) => {
  return { type: ActionTypes.UPDATE_VIEW, view };
};

const loadView: ThunkActionCreator = (view: View) => {
  return dispatch => {
    switch (view) {
      case View.view1:
        import("../components/my-view1.js").then(() => {
          // Put code in here that you want to run every time when
          // navigating to view1 after my-view1.js is loaded.
        });
        break;
      case View.view2:
        import("../components/my-view2.js");
        break;
      case View.view3:
        import("../components/my-view3.js");
        break;
      default:
        view = View.view404;
        import("../components/my-view404.js");
    }
    dispatch(updateView(view));
  };
};

let snackbarTimer: NodeJS.Timer;

export const showSnackbar: ThunkActionCreator = () => dispatch => {
  dispatch({ type: ActionTypes.OPEN_SNACKBAR });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(
    () => dispatch({ type: ActionTypes.CLOSE_SNACKBAR }),
    3000
  );
};

export const updateOffline: ThunkActionCreator = (offline: boolean) => (
  dispatch,
  getState
) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({ type: ActionTypes.UPDATE_OFFLINE, offline });
};

export const updateLayout: ThunkActionCreator = () => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
};

export const updateDrawerState: ThunkActionCreator = (opened: boolean) => (
  dispatch,
  getState
) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: ActionTypes.UPDATE_DRAWER_STATE,
      opened
    });
  }
};
