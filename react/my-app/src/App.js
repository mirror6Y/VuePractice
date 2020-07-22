import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Index from './pages/index/index'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} key="/login"></Route>
        <Route path='/' component={Index} key="/"></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
