import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions/authActions';

const Navbar = ({ authenticated, signOut }) => {
  const signedInLinks = (
    <ul className='signed-in-navigation'>
      <li>
        <Link to='/create'>Create</Link>
      </li>
      <li>
        <Link to='/graphics'>Graphics</Link>
      </li>
      <li>
        <Link to='#' onClick={signOut}>
          Signout
        </Link>
      </li>
    </ul>
  );

  const signedOutLinks = (
    <ul className='signed-out-navigation'>
      <li>
        <Link to='/signup'>Signup</Link>
      </li>
      <li>
        <Link to='signin'>Signin</Link>
      </li>
    </ul>
  );

  return (
    <div className='navbar-wrapper'>
      <div className='navbar-container'>
        <div className='branding'>
          <Link to='/'>B.</Link>
        </div>
        <div className='navigation'>
          {authenticated ? signedInLinks : signedOutLinks}
        </div>
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
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
