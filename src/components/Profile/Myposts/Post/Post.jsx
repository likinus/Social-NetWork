import React from 'react';
import s from './Post.module.css';

function Post(props) {
  return (
    <div className={s.item}>
      <img
        src="https://vignette.wikia.nocookie.net/avatar/images/f/f4/3х21_Аанг.jpg/revision/latest?cb=20110327121409&path-prefix=ru"
        alt="some img"></img>
      {props.message}
      <div>
        <span>like {props.likesCount}</span>
      </div>
    </div>
  );
}

export default Post;
