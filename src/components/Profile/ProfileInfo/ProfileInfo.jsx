import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/img/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

function ProfileInfo(props) {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large || userPhoto} className={s.mainPhoto} alt="some img" />
        {props.isOwner && (
          <div>
            <input onChange={onMainPhotoSelected} type="file" />
          </div>
        )}
        {editMode ? (
          <ProfileDataForm
            initialValues={props.profile}
            aboutMe={props.aboutMe}
            onSubmit={onSubmit}
            profile={props.profile}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => setEditMode(true)}
          />
        )}
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
    </div>
  );
}

const ProfileData = (props) => {
  return (
    <>
      {props.isOwner ? (
        <div>
          <button onClick={props.goToEditMode}>Edit</button>
        </div>
      ) : null}
      <p>
        <b>My name is: </b>
        {props.profile.fullName}
      </p>
      <p>
        <b>About me:</b> {props.profile.aboutMe}
      </p>
      <div>
        <b>Loking for a Job:</b> {props.profile.lookingForAJob ? 'Yes' : 'No'}
      </div>
      {props.profile.lookingForAJob ? (
        <div>
          <b>My professional skils: </b> {props.profile.lookingForAJobDescription}
        </div>
      ) : null}
      <div>
        <b>Contacts:</b>{' '}
        {Object.keys(props.profile.contacts).map((key) => (
          <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
        ))}
      </div>
    </>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>
        {contactTitle}: {contactValue}
      </b>
    </div>
  );
};

export default ProfileInfo;
