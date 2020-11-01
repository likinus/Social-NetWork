import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  // let sideBarElements = props.state.sideBar.bestFriends.map((friend) => (
  //   <div className={s.block}>
  //     <div>
  //       <div className={s.circle}></div>
  //     </div>
  //     <p className={s.friendsName}>{friend.name}</p>
  //   </div>
  // ));

  return (
    <>
      <nav className={s.nav}>
        <div className={`${s.item} ${s.active}`}>
          <NavLink to="/profile" activeClassName={s.active}>
            Profile
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.active}>
            Messages
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/news" activeClassName={s.active}>
            News
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/users" activeClassName={s.active}>
            Users
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/music" activeClassName={s.active}>
            Music
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/settings" activeClassName={s.active}>
            Settings
          </NavLink>
        </div>
        {/* <div>
              {state.sideBar.bestFriends.map((friend) => (
                <div className={s.block}>
                  <div>
                    <div className={s.circle}></div>
                  </div>
                  <p className={s.friendsName}>{friend.name}</p>
                </div>
              ))}
            </div> */}
      </nav>
    </>
  );
}

export default Nav;
