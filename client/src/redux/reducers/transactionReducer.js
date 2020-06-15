const INIT_STATE = {
  errors: {},
  transaction: null,
  transactions: [],
};

const transactionReducer = (state = INIT_STATE, action) => {
  // eslint-disable-next-line
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_TRANSACTION_SUCCESS':
      return {
        ...state,
        errors: null,
        transaction: null,
        transactions: [payload, ...state.transactions],
      };
    case 'CREATE_TRANSACTION_FAILURE':
      return {
        ...state,
        errors: payload,
      };
    case 'GET_TRANSACTIONS_SUCCESS':
      return {
        ...state,
        errors: null,
        transaction: null,
        transactions: payload,
      };
    case 'GET_TRANSACTIONS_FAILURE':
      return state;
    case 'GET_TRANSACTION_SUCCESS':
      return {
        ...state,
        transaction: payload,
      };
    case 'GET_TRANSACTION_FAILURE':
      return state;
    case 'EDIT_TRANSACTION_SUCCESS':
      return {
        ...state,
        errors: null,
      };
    case 'EDIT_TRANSACTION_FAILURE':
      return state;
    default:
      return state;
  }
};

export default transactionReducer;
