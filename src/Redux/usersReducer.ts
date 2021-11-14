import { Dispatch } from 'redux';

import { PropertiesTypes, BaseThunkType } from './reduxStore';
import { usersAPI } from '../api/usersApi';
import { updateObjectInArray } from '../utils/object-helpers';
import { UserType } from '../types/types'

type InitialStateType = typeof initialState

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 19,
  currentPage: 2, 
  isFetching: false,
  followed: false,
  followingInProgress: [] as Array<number>, //array if users id
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: true };
        //   }
        //   return u;
        // }),
      };

    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
        // users: state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: false };
        //   }
        //   return u;
        // }),
      };
    case 'SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage };
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case 'TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching };
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
      //Повторить
    }
    default:
      return state;
  }
};

type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>

export const actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),

  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  
  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  
 setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage,
  } as const),
  
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount,
  } as const),
  
  toggleFetching: (isFetching: boolean) => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching,
  } as const),
  
  toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userId,
  } as const),
}

export const getUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleFetching(true));
    dispatch(actions.setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.toggleFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, 
  apiMethod: any, 
  actionCreator: (userId: number) => ActionsTypes) => {
  dispatch(actions.toggleFollowingInProgress(true, userId));

  let data = await apiMethod(userId);

  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingInProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.followUser.bind(usersAPI);
    _followUnfollowFlow(dispatch, userId, apiMethod, actions.followSuccess);

    dispatch(actions.toggleFollowingInProgress(true, userId));
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI);
    _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowSuccess);
  };
};

export default usersReducer;
