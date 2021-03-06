import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likiesCount: 12 },
    { id: 2, message: 'It is my first post :)', likiesCount: 19 },
  ],
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: 3,
            message: action.newPostText,
            likiesCount: 0,
          },
        ],
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        posts: state.posts.filter((p) => action.postId !== p.id),
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });

export const setStatus = (status) => ({ type: SET_STATUS, status });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (status) => async (dispatch) => {
  let response = await profileAPI.getStatus(status);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
