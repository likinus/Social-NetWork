import { instance, ResponseType, ResultCodeForCaptcha, ResultCodesEnum } from './api';

type MeResponseDataType = {
      id: number
      email: string 
      login: string 
  }
  
  type LoginResponseDataType = {
      userId: number
  }

 export const authAPI = {
    getAuthData() {
      return instance.get<ResponseType<MeResponseDataType>>('auth/me').then((response) => response.data);
    },
  
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
      return instance.post<ResponseType<LoginResponseDataType, ResultCodeForCaptcha | ResultCodesEnum>>('auth/login', { email, password, rememberMe, captcha }).then(response => response.data);
    },
  
    logout() {
      return instance.delete('auth/login');
    },
  };

  type GetCaptureUrlResponseType = {
    url: string,
  }

  export const securityAPI = {
    getCaptchaUrl() {
      return instance.get<GetCaptureUrlResponseType>('security/get-captcha-url').then(response => response.data);
    },
  };