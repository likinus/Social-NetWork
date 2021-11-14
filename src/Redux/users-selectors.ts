import { createSelector } from 'reselect';
import { AppStateType } from './reduxStore';

export const getAllUsersSelector = (state: AppStateType) => {
  return state.usersPage.users;
}; // Пример реселекта

export const getAllUsers = createSelector(getAllUsersSelector, (users) => {
  return users.filter((u) => true);
}); // Пример реселекта

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};
