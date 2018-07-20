import setup_navbar from './components/navbar.js';
import setup_stopwatch from './containers/stopwatch.js';
// import setup_footer from './components/footer.js';

((win, doc, log, si, ci, sto, loc) => {
  // Setup the app
  setup_navbar();
  setup_stopwatch();
  // console.log(win.customElements.get('foo-ter'));
  // setup_footer();
})(
  window, 
  document, 
  console, 
  setInterval, 
  clearInterval, 
  setTimeout, 
  window.location
);

// References:
// es6 version of http://jsfiddle.net/cferdinandi/nb40j6rf/6/?mc_cid=1d481e891a&mc_eid=a3f6fd745a
// https://css-tricks.com/reactive-uis-vanillajs-part-2-class-based-components/