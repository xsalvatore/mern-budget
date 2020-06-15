import authReducer from './authReducer';
import transactionReducer from './transactionReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
});

export default rootReducer;
