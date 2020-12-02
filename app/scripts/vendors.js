// import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11';
// import 'html5shiv';
import 'intersection-observer';
import './polyfills';
import 'picturefill';
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/native-loading/ls.native-loading';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import svgPolyfill from 'svg4everybody';
import jquery from 'jquery';
import swiper from 'swiper/bundle';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default';
import datepicker from "js-datepicker/dist/datepicker.min";
import select2 from "select2/dist/js/select2.full"

window.$ = window.jQuery = jquery;
window.svg4everybody = svgPolyfill;
window.Swiper = swiper;
window.PhotoSwipe = PhotoSwipe;
window.PhotoSwipeUI = PhotoSwipeUI;
window.datepicker = datepicker;
window.select2 = select2;

lazySizes.cfg.lazyClass = 'lazy';
lazySizes.cfg.srcAttr = 'data-original';
lazySizes.cfg.loadMode = 1;
lazySizes.cfg.nativeLoading = {
  setLoadingAttribute: true,
  disableListeners: {
    scroll: true,
  },
};