import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../common/Preloader/FormsControls/FormsControls';
import { connect } from 'react-redux';
import { login } from '../../Redux/AuthReducer';
import { Redirect } from 'react-router-dom';
import style from '../../components/common/Preloader/FormsControls/FormsControls.module.css';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
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
      {props.error ? <div className={style.formSummaryError}>{props.error}</div> : null}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
