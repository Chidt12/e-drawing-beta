import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import {UserIsAuthenticated, UserIsNotAuthenticated} from './components/helpers/auth'

import Login from "./components/auth/Login";
import Arena from './components/Arena';
import Global from './components/Global';
import Dashboard from './components/Dashboard';
import Profile from './components/Profiles';
import Practice from './components/practice/Practice';
import Ranking from './components/Ranking';
import TestBeta from './components/TestBeta'

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <div className="App">
              <Route path="/" component ={UserIsAuthenticated(Global)}/>
              <Route path="/" exact component={UserIsAuthenticated(Dashboard)} />
              <Route path="/login" exact component={UserIsNotAuthenticated(Login)} />
              <Route path = "/arena" exact component = {UserIsAuthenticated(Arena)}/>
              <Route path = "/profile/:id" exact component = {UserIsAuthenticated(Profile)}/>
              <Route path="/testplay"exact component={UserIsAuthenticated(TestBeta)}/>
              <Route path = "/profile" exact component = {UserIsAuthenticated(Profile)}/>
              <Route path = "/practice" exact component = {UserIsAuthenticated(Practice)}/>
              <Route path = "/ranking" exact component = {UserIsAuthenticated(Ranking)}/>
            </div>
            
      
        </Router>
      </Provider>
    );
  }
}

export default App;
