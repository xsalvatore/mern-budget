import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getTransaction,
  editTransaction,
  deleteTransaction,
} from '../redux/actions/transactionActions';

const TransactionEdit = ({
  getTransaction,
  deleteTransaction,
  editTransaction,
  authenticated,
  transaction,
  match,
  history,
  user,
}) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    type: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    if (authenticated) {
      const transactionId = match.params.id;
      getTransaction(transactionId);
    }
  }, [getTransaction, authenticated, match.params.id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await editTransaction(formData);

    history.push('/');
  };

  const onDelete = async (e) => {
    e.preventDefault();

    await deleteTransaction(transaction, user);

    history.push('/');
  };

  if (!authenticated && !transaction) return <Redirect to='/signin' />;

  if (transaction && loading === true) {
    setFormData({
      id: transaction._id,
      title: transaction.title,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
    });
    setLoading(false);
  }

  return (
    <div className='edit-wrapper'>
      {transaction && (
        <div className='edit-container'>
          <h1 className='heading'>Edit</h1>
          <form>
            <div className='input-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                name='title'
                onChange={onChange}
                required
                value={formData.title}
              />
            </div>

            <div className='input-group'>
              <label htmlFor='amount'>Amount</label>
              <input
                type='number'
                name='amount'
                onChange={onChange}
                required
                value={formData.amount}
              />
            </div>

            <div className='input-group'>
              <label htmlFor='type'>Type</label>
              <select
                name='type'
                defaultValue={formData.type}
                onChange={onChange}
                required
              >
                <option value='+'>Income</option>
                <option value='-'>Expense</option>
              </select>

              <div className='arrow-down'>&#60;</div>
            </div>

            <div className='input-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                name='description'
                rows='1'
                onChange={onChange}
                required
                value={formData.description}
              ></textarea>
            </div>

            <button onClick={onSubmit}>Edit</button>

            <button onClick={onDelete} className='delete'>
              Delete
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    transaction: state.transaction.transaction,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransaction: (transactionId) => dispatch(getTransaction(transactionId)),
    editTransaction: (transaction) => dispatch(editTransaction(transaction)),
    deleteTransaction: (transaction, user) =>
      dispatch(deleteTransaction(transaction, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionEdit);
