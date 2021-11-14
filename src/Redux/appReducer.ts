import { getAuthUserData } from './AuthReducer';

import { PropertiesTypes, BaseThunkType } from './reduxStore';

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;

type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>;

type ThunkType = BaseThunkType<ActionsTypes>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const actions = {
  initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
