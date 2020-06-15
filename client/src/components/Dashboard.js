import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getTransactions } from '../redux/actions/transactionActions';

import Thumbnail from './Thumbnail';

const Dashboard = ({ user, authenticated, transactions, getTransactions }) => {
  useEffect(() => {
    if (user) {
      getTransactions(user);
    }
  }, [getTransactions, user]);

  if (!authenticated && !user) {
    return <Redirect to='/signin' />;
  }

  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-container'>
        <h1 className='heading'>Dashboard</h1>
        <div className='thumbnails'>
          {transactions.length === 0 && (
            <p>There is no transactions currently</p>
          )}

          {transactions.map((transaction) => {
            return (
              <Thumbnail key={transaction._id} transaction={transaction} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    transactions: state.transaction.transactions,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (user) => dispatch(getTransactions(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
