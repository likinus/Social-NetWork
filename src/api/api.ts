import axios from 'axios';
import { UserType } from '../types/types';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '7aac75ff-fa17-40ac-a804-1c3e459af873',
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CaptachaIsRequired = 10
}

export enum ResultCodeForCaptcha {
  CaptachaIsRequired = 10
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
}


export type GetItemstype = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}