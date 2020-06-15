import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signIn } from '../redux/actions/authActions';
import { connect } from 'react-redux';

const SignIn = ({ authenticated, signIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    signIn(formData);
  };

  if (authenticated) return <Redirect to='/' />;

  return (
    <div className='sign-in-wrapper'>
      <div className='sign-in-container'>
        <h1 className='heading'>Signin</h1>

        <form onSubmit={onSubmit}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={onChange} />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={onChange} />
          </div>

          <button>Signin</button>
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
    signIn: (credentials) => dispatch(signIn(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
