/*-------------------------------------------------------------------------------*/
/* WEBPACK DEV SERVER INJECTOR                                                   */
/*-------------------------------------------------------------------------------*/
if (module.hot) {
  module.hot.accept();
}
/*-------------------------------------------------------------------------------*/
/* From webpack docs https://webpack.js.org/loaders/sass-loader/                 */
/*-------------------------------------------------------------------------------*/
import '../styles/index.scss';

/*------------------------------------------------------------------------------*/
/* Lazy Loading Images                                                          */
/*------------------------------------------------------------------------------*/
import 'lazysizes';

/*-------------------------------------------------------------------------------*/
/* Lazy loading JS on click event                                                */
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


