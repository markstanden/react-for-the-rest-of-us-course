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
import React from 'react'
import ReactDOM from 'react-dom'

/* Import created react components */
import Header from './components/Header.js'
import HomeGuest from './components/HomeGuest.js'
import Footer from './components/Footer.js'

/* Create an array of the components to be rendered */
function Main() {
  return (
    <>
      <Header />
      <HomeGuest />
      <Footer />
    </>
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
