import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login'
import Index from './pages/index/index'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Index}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
