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
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

/* Import created react components */
import Header from './components/Header.js'
import HomeGuest from './components/HomeGuest.js'
import Home from './components/Home.js'
import Footer from './components/Footer.js'
import About from './components/About.js'
import Terms from './components/Terms.js'
import CreatePost from './components/CreatePost'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:8080'

/* Create an array of the components to be rendered */
function Main() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('complexAppToken'))
  )

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <HomeGuest />}
        </Route>
        <Route path="/create-post">
          <CreatePost />
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
  )
}

/* render react components */
ReactDOM.render(<Main />, document.querySelector('#app'))

/*-------------------------------------------------------------------------------*/
/* example code for Lazy loading JS on click event                               */
/*-------------------------------------------------------------------------------*/

// let modal;

/* Creates an event listener so that the modal.js file is downloaded only
when a click is made, so reduce data usage, and speed up site load time */

// document.querySelectorAll('.open-modal').forEach(el => {
//   el.addEventListener('click', e => {
//     e.preventDefault();
//     if (!modal) {
//       import(/* webpackChunkName: "modal" */ './modules/Modal.js')
//         .then(x => {
//           modal = new x.default();
//           setTimeout(() => modal.openTheModal(), 20);
//         })
//         .catch(() => console.log(`problem loading Modal.js`));
//     } else {
//       modal.openTheModal();
//     }
//   });
// });
