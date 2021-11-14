import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input, TextArea } from '../../common/Preloader/FormsControls/FormsControls';
import s from './ProfileInfo.module.css';
import style from '../../common/Preloader/FormsControls/FormsControls.module.css';

const ProfileDataForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div>
          <button onClick={props.goToEditMode}>Save</button>
        </div>
        {props.error ? <div className={style.formSummaryError}>{props.error}</div> : null}
        <div>
          <b>My name is: </b>
          <Field
            placeholder="full name"
            name="fullName"
            validate={[]}
            component={Input}
            {...props}
          />
        </div>
        <div>
          <b>About me: </b>{' '}
          <Field
            placeholder="about you"
            name="aboutMe"
            validate={[]}
            component={Input}
            {...props}
          />
        </div>
        <div>
          <b>Loking for a Job:</b>
          <Field name="lookingForAJob" validate={[]} component={Input} type="checkbox" {...props} />
        </div>

        <div>
          <b>My professionals skills :</b>
          <Field
            placeholder="your professional skills"
            name="lookingForAJobDescription"
            validate={[]}
            component={TextArea}
            {...props}
          />
        </div>

        <div>
          <b>Contacts:</b>
          {Object.keys(props.profile.contacts).map((key) => (
            <div key={key} className={s.contact}>
              <b>
                {key}:
                <Field
                  placeholder={key}
                  name={'contacts.' + key}
                  validate={[]}
                  component={Input}
                  {...props}
                />
              </b>
            </div>
          ))}
        </div>
      </form>
    </>
  );
};

const ProfileDataReduxForm = reduxForm({ form: 'editProfile' })(ProfileDataForm);

export default ProfileDataReduxForm;
