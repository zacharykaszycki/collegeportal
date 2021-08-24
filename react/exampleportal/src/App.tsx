import React from 'react';
import './App.css';
import LoginForm from './components/logincomponents/LoginForm';
import SignupForm from './components/signup/SignUpForm';

import { Dispatch } from "react";
// import * as Redux from 'redux';
import { IUser } from './redux/stateStructures';
//import 'bootstrap/dist/css/bootstrap.min.css';

import MainMenu from "./components/mainpagecomponents/MainMenu";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from './redux/store';
import ProtectedRoute from './components/common/ProtectedRoute'




//THIS is our ACTUAL component
function App() {

  const isLoggedIn = useSelector((state:RootState)=>state.auth.isLoggedIn);

  // Boilerplate to test redux store on a

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <LoginForm />
          </Route>
          <Route path='/register'>
            <SignupForm />
          </Route>
          <Route path='/login'>
            <LoginForm />
          </Route>

          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={MainMenu} />
        </Switch>
      </Router>
    </>
  )
}



export default App;
