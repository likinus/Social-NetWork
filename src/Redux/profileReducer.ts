import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profileApi';
import { PostsType, PhotosType, ProfileType } from '../types/types'
import { PropertiesTypes, BaseThunkType } from './reduxStore';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likiesCount: 12 },
    { id: 2, message: 'It is my first post :)', likiesCount: 19 },
  ] as Array<PostsType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
};

export type InitialStateType = typeof initialState

type ActionsTypes = ReturnType<PropertiesTypes<typeof actions>>;

type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likiesCount: 0
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: ''
      };
    }

    case 'SET_USER_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter((p) => action.postId !== p.id),
      };
    }
    case 'SAVE_PHOTO_SUCCESS': {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(response));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(response));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(response.data.photos));
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let response = await profileAPI.saveProfile(profile);

  if (response.resultCode === 0) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error('user id cant be nullable')
    }
  } else {
    dispatch(stopSubmit('editProfile', { _error: response.messages[0] }));
    return Promise.reject(response.messages[0]);
  }
};

export default profileReducer;
