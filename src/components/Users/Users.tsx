import React, { FC } from 'react';
import Paginator from '../common/Paginator/Paginator';
import { UserType } from '../../types/types';
import User from './User';

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    totalUsersCount: number,
    pageSize: number,
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
  }

let Users: FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props }) => {
  return (
    <>
      <Paginator
        currentPage={currentPage}  
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User 
          user={u} 
          followingInProgress={props.followingInProgress}
          key={u.id}
          unfollow={props.unfollow}
          follow={props.follow}
          />
        ))}
      </div>
    </>
  );
};

export default Users;
