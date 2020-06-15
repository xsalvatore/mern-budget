import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createTransaction } from '../redux/actions/transactionActions';

const Create = ({
  history,
  user,
  authenticated,
  createTransaction,
  errors,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '+',
    amount: '',
    description: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createTransaction(user, formData);

    history.push('/');
  };

  if (!authenticated && !user) return <Redirect to='/signin' />;

  return (
    <div className='create-wrapper'>
      <div className='create-container'>
        <h1 className='heading'>Create</h1>

        <form onSubmit={onSubmit}>
          <div className='input-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              required
              onChange={onChange}
            />
          </div>

          <div className='input-group'>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              name='amount'
              value={formData.amount}
              required
              onChange={onChange}
            />
          </div>

          <div className='input-group'>
            <label htmlFor='type'>Type</label>
            <select name='type' required onChange={onChange}>
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
              value={formData.description}
              required
              onChange={onChange}
            ></textarea>
          </div>

          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user,
    errors: state.transaction.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTransaction: (user, transaction) =>
      dispatch(createTransaction(user, transaction)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
