const INIT_STATE = {
  authenticated: null,
  errors: {},
  token: localStorage.getItem('token'),
  user: null,
};

const authReducer = (state = INIT_STATE, action) => {
  // eslint-disable-next-line
  const { type, payload } = action;

  switch (type) {
    case 'USER_LOADED_SUCCESS':
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case 'SIGN_UP_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        authenticated: true,
        errors: null,
        user: payload,
      };
    case 'USER_LOADED_FAILURE':
    case 'SIGN_UP_FAILURE':
    case 'SIGN_IN_FAILURE':
      return {
        ...state,
        token: null,
        authenticated: false,
        errors: payload,
        user: null,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        authenticated: false,
        errors: null,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
