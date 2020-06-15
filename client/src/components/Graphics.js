import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';

const Graphics = ({ transactions, authenticated, user }) => {
  if (!authenticated && !user) {
    return <Redirect to='/signin' />;
  }

  const logIncomes = () => {
    const incomesArray = transactions.filter(
      (transaction) => transaction.type === '+'
    );

    let total = 0;

    // eslint-disable-next-line
    const incomesTotal = incomesArray.forEach(
      (transaction) => (total += transaction.amount)
    );

    return total;
  };

  const logExpenses = () => {
    const expensesArray = transactions.filter(
      (transaction) => transaction.type === '-'
    );

    let total = 0;

    // eslint-disable-next-line
    const expensesTotal = expensesArray.forEach(
      (transaction) => (total += transaction.amount)
    );

    return total;
  };

  const data = {
    labels: ['Incomes', 'Expenses'],
    datasets: [
      {
        label: 'Budget',
        data: [logIncomes(), logExpenses()],
        backgroundColor: ['#48bb78', '#f56565'],
      },
    ],
  };

  return (
    <div className='graphics-wrapper'>
      <div className='graphics-container'>
        <h1 className='heading'>Graphics</h1>

        <div className='datas'>
          <div className='card'>
            <div className='header'>
              <h3>Incomes</h3>
              <div className='legende-wrapper income'>
                <div className='color-code'></div>
              </div>
            </div>

            <div className='body'>{logIncomes()} $</div>
          </div>

          <div className='card'>
            <div className='header'>
              <h3>Expenses</h3>
              <div className='legende-wrapper expense'>
                <div className='color-code'></div>
              </div>
            </div>

            <div className='body'>{logExpenses()} $</div>
          </div>

          <div className='card'>
            <div className='header'>
              <h3>Balance</h3>
            </div>
            <div className='body'>
              {Math.round((logIncomes() - logExpenses()) * 100) / 100} $
            </div>
          </div>
        </div>

        <Doughnut data={data} legend={false} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transaction.transactions,
    authenticated: state.auth.authenticated,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Graphics);
