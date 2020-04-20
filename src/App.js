import React from 'react';
import { Route } from "react-router-dom";

import HomePage  from "./pages/hompage/homepage.component";
import ShopPage from './pages/shop/ShopPage.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/signin-signup/signin-signup.component';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <switch>
        <Route exact  path='/' component={HomePage}/>
        <Route exact  path='/shop' component={ShopPage}/>
        <Route exact  path='/signin' component={SignInAndSignUpPage}/>

      </switch>
    </div>
  );
}


export default App;
 