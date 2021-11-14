import React from 'react';
import { connect } from 'react-redux';
import {
  follow,
  unfollow,
  getUsers,
} from '../../Redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../HOC/WithAuthRedirect';
import { compose } from 'redux';
import {
  getAllUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFollowingInProgress,
} from '../../Redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../Redux/reduxStore';

type MapStatePropsType = {
  currentPage: number,
  pageSize: number,
  isFetching: boolean,
  totalUsersCount: number,
  users: Array<UserType>,
  followingInProgress: Array<number>,
}

type OwnPropsType = {
  pageTitle: string,
}

type MapDispatchPropsType = {
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  getUsers: (currentPage: number, pageSize: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    const { currentPage, pageSize, getUsers } = this.props;
    getUsers(currentPage, pageSize);
  }

  onPageChanged = (page: number) => {
    const { pageSize, getUsers } = this.props;
    getUsers(page, pageSize);
  };

  render() {
    const {
      totalUsersCount,
      pageSize,
      currentPage,
      users,
      follow,
      unfollow,
      followingInProgress,
      isFetching
    } = this.props

    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChanged={this.onPageChanged}
          users={users}
          follow={follow}
          unfollow={unfollow}
          followingInProgress={followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getAllUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps, {
    follow,
    unfollow,
    getUsers,
  }),
  withAuthRedirect,
)(UsersContainer);
