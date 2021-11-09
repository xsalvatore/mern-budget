import axios from 'axios';

export const createTransaction = (user, transaction) => async (dispatch) => {
  const token = localStorage.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  const body = transaction;

  try {
    const res = await axios.post(
      'http://localhost:5000/api/transactions',
      body,
      config
    );

    dispatch({ type: 'CREATE_TRANSACTION_SUCCESS', payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch({ type: 'CREATE_TRANSACTION_FAILURE', payload: errors });
    }
  }
};

export const getTransactions = (user) => async (dispatch) => {
  try {
    const token = localStorage.token;
    const id = user._id;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };

    const res = await axios.get(
      `http://localhost:5000/api/transactions/${id}`,
      config
    );

    dispatch({ type: 'GET_TRANSACTIONS_SUCCESS', payload: res.data });
  } catch (err) {
    console.log('catch block');
  }

  // dispatch goes here
};

export const getTransaction = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'x-auth-token': localStorage.token,
      },
    };

    const res = await axios.get(
      `http://localhost:5000/api/transactions/unique/${id}`,
      config
    );

    dispatch({ type: 'GET_TRANSACTION_SUCCESS', payload: res.data });
  } catch (err) {
    console.log('catch block');
  }
};

export const editTransaction = (transaction) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.token,
    },
  };

  const body = transaction;

  const id = transaction.id;

  const res = await axios.post(
    `http://localhost:5000/api/transactions/edit/${id}`,
    body,
    config
  );

  dispatch({ type: 'EDIT_TRANSACTION_SUCCESS', payload: res.data });

  try {
  } catch (err) {
    console.log('errors');
    // dispatch goes here
  }
};

export const deleteTransaction = (transaction) => async (dispatch) => {
  const transactionId = transaction._id;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.token,
    },
  };

  const res = await axios.delete(
    `http://localhost:5000/api/transactions/delete/${transactionId}`,
    config
  );

  console.log('res:', res);
};
