/*-------------------------------------------------------------------------------*/
/* WEBPACK DEV SERVER INJECTOR                                                   */
/*-------------------------------------------------------------------------------*/
if (module.hot) {
  module.hot.accept()
}
/* -------------------------------------------------------------------------------* /
/* REACT SITE INTEGRATION                                                        */
/*-------------------------------------------------------------------------------*/
import React, { useState, useReducer, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useImmerReducer } from 'use-immer'
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
import Profile from './components/Profile'

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
    user: {
      token: localStorage.getItem('complexAppToken'),
      username: localStorage.getItem('complexAppUsername'),
      avatar: localStorage.getItem('complexAppAvatar'),
    },
  }

  // DEFINE THE DISPATCH CALLS
  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true
        draft.user.token = action.data.token
        draft.user.username = action.data.username
        draft.user.avatar = action.data.avatar
        break
      case 'logout':
        draft.loggedIn = false
        break
      case 'flashMessage':
        draft.flashMessages.push(action.value)
        break
    }
  }

  // CREATE REDUCER
  // state is the current values of the state variables, initialised by initialState object
  // dispatch is the function whos arguments are passed to the ourReducer function
  // the ourReducer function can now modify the state object (labelled draft in our case)
  // and useImmerReducer returns a newObject to state, with the alterations made.

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('complexAppToken', state.user.token)
      localStorage.setItem('complexAppUsername', state.user.username)
      localStorage.setItem('complexAppAvatar', state.user.avatar)
    } else {
      localStorage.removeItem('complexAppToken')
      localStorage.removeItem('complexAppUsername')
      localStorage.removeItem('complexAppAvatar')
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path="/profile/:username">
              <Profile />
            </Route>
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
