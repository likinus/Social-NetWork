import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

function ProfileInfo(props) {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div>
        <img
          className={s.main_img}
          src="https://klike.net/uploads/posts/2019-06/1560664221_1.jpg"
          alt="some img"></img>
      </div> */}
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt="some img" />
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        <h2>{props.profile.fullName}</h2>
        <p>{props.profile.aboutMe}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
