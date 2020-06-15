import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signUp } from '../redux/actions/authActions';
import { connect } from 'react-redux';

const SignUp = ({ signUp, authenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    signUp(formData);
  };

  if (authenticated) return <Redirect to='/' />;

  return (
    <div className='sign-up-wrapper'>
      <div className='sign-up-container'>
        <h1 className='heading'>Signup</h1>

        <form onSubmit={onSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={onChange} />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={onChange} />
          </div>

          <button>Signup</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (credentials) => dispatch(signUp(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
