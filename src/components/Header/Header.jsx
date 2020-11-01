import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

function Header(props) {
  return (
    <header className={s.header}>
      <img
        alt="image"
        src="https://s3.amazonaws.com/cinnproductimg/OoODnF2dDQjCqXWJDqGnkIgaxrNMBwEb8ESx0SmS9GRxUIKpzDTLREP5ioGzK6bNZH1H6u3hkbIzXAfps4aUIDHyfT.jpg"
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Logout</button>
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
