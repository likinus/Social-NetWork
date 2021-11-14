import { stopSubmit } from 'redux-form';

import { authAPI, securityAPI } from '../api/AuthApi';
import { ResultCodesEnum } from '../api/api';
import { PropertiesTypes, BaseThunkType } from './reduxStore';

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: null as boolean | null,
  captchaUrl: null as string | null,
};

type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>;

export type InitialStateType = typeof initialState;

type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_USER_DATA':
    case 'GET_CAPTCHA_URL_SUCCESS':
      return {
         ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'auth/SET_USER_DATA',
    payload: { userId, email, login, isAuth },
  } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'GET_CAPTCHA_URL_SUCCESS',
    payload: { captchaUrl },
  } as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch ) => {
  let data = await authAPI.getAuthData();

  if (data.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodesEnum.CaptachaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message = data.messages.length > 0 ? data.messages[0] : 'some Erorr';
    dispatch(stopSubmit('login', { _error: message }));
  }
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  
  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.url;

  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export default authReducer;
