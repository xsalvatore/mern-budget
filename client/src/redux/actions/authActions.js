import axios from 'axios';

// loads a user
export const loadUser = () => async (dispatch) => {
  try {
    let config;

    if (localStorage.token) {
      config = {
        headers: {
          'x-auth-token': localStorage.token,
        },
      };
    }

    const res = await axios.get('http://localhost:5000/api/auth', config);

    dispatch({
      type: 'USER_LOADED_SUCCESS',
      payload: res.data,
    });
  } catch (err) {
    localStorage.removeItem('token');
    dispatch({ type: 'USER_LOADED_FAILURE' });
  }
};

// signs up a user
export const signUp = (credentials) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(credentials);

  try {
    const res = await axios.post(
      'http://localhost:5000/api/users',
      body,
      config
    );

    dispatch({
      type: 'SIGN_UP_SUCCESS',
      payload: res.data,
    });

    localStorage.setItem('token', res.data.token);

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error.msg, 'danger'));
    }

    dispatch({
      type: 'SIGN_UP_FAILURE',
      payload: errors,
    });
  }
};

// signs in a user
export const signIn = (credentials) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(credentials);

  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth',
      body,
      config
    );

    dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: res.data,
    });

    localStorage.setItem('token', res.data.token);

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => console.log(error.msg, 'danger'));
    }
    dispatch({
      type: 'SIGN_IN_FAILURE',
    });
  }
};

// signs out a user
export const signOut = () => async (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: 'SIGN_OUT' });
};
