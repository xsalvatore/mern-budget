import React from 'react';
import { Link } from 'react-router-dom';

const Thumbnail = ({ transaction }) => {
  return (
    <Link to={`/edit/transaction/${transaction._id}`}>
      <div className='thumbnail'>
        <div className='header'>
          <h3>{transaction.title}</h3>
          <h3>
            {transaction.type}
            {transaction.amount} $
          </h3>
        </div>

        <div className='body'>
          <p>{transaction.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default Thumbnail;
