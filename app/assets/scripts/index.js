/*-------------------------------------------------------------------------------*/
/* WEBPACK DEV SERVER INJECTOR                                                   */
/*-------------------------------------------------------------------------------*/
if (module.hot) {
  module.hot.accept()
}

/*-------------------------------------------------------------------------------*/
/* From webpack docs https://webpack.js.org/loaders/sass-loader/                 */
/*-------------------------------------------------------------------------------*/
import '../styles/index.scss'

/*------------------------------------------------------------------------------*/
/* Lazy Loading Images                                                          */
/*------------------------------------------------------------------------------*/
import 'lazysizes'

/*-------------------------------------------------------------------------------*/
/* REACT SITE INTEGRATION                                                        */
/*-------------------------------------------------------------------------------*/
import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from 'axios'

import DispatchContext from './DispatchContext'
import StateContext from './StateContext'

/* Import created react components */
import Header from './components/Header.js'
import HomeGuest from './components/HomeGuest.js'
import Home from './components/Home.js'
import Footer from './components/Footer.js'
import About from './components/About.js'
import Terms from './components/Terms.js'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'

Axios.defaults.baseURL = 'http://localhost:8080'

/* Create an array of the components to be rendered */
function Main() {
  /* 
    APP GLOBAL STATE REDUCER
  */

  //  INITIAL STATE OF REDUCER
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('complexAppToken')),
    flashMessages: [],
  }

  // CREATE REDUCER
  const [state, dispatch] = useReducer(ourReducer, initialState)

  // DEFINE THE DISPATCH CALLS
  function ourReducer(state, action) {
    switch (action.type) {
      case 'login':
        return { loggedIn: true, flashMessages: state.flashMessages }
      case 'logout':
        return { loggedIn: false, flashMessages: state.flashMessages }
      case 'flashMessage':
        return {
          loggedIn: state.loggedIn,
          flashMessages: state.flashMessages.concat(action.value),
        }
    }
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id">
              <ViewSinglePost />
            </Route>
            <Route path="/about-us">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

/* render react components */
ReactDOM.render(<Main />, document.querySelector('#app'))
