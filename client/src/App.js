import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Create from './components/Create';
import Graphics from './components/Graphics';
import TransactionEdit from './components/TransactionEdit';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />

        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/graphics' component={Graphics} />
          <Route
            exact
            path='/edit/transaction/:id'
            component={TransactionEdit}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
