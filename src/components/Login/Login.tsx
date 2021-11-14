import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/Preloader/FormsControls/FormsControls';
import { connect } from 'react-redux';
import { login } from '../../Redux/AuthReducer';
import { Redirect } from 'react-router-dom';
import style from '../../components/common/Preloader/FormsControls/FormsControls.module.css';
import { AppStateType } from '../../Redux/reduxStore';

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field placeholder="Email" validate={[required]} name="email" component={Input} />
      </div>
      <div>
        <Field
          placeholder="Password"
          validate={[required]}
          name="password"
          type="password"
          component={Input}
        />
      </div>
      <div>
        <Field component="input" name="rememberMe" type="checkbox" /> Remember me
      </div>
      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl && (
        <Field placeholder="captcha" validate={[required]} name="captcha" component={Input} />
      )}
      {error ? <div className={style.formSummaryError}>{error}</div> : null}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login',
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean | null
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
