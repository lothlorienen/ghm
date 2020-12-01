class GallerySliderVideo extends Widget {
  constructor(node) {
    super(node, 'js-slider-gallery--video');

    this.$slider = this.queryElement('.slider');
    this.$slider ? GallerySliderVideo_Slider.init(this.$node) : null;
  }

  static init(el) {
    el && new GallerySliderVideo(el);
  }
}

window.GallerySliderVideo = GallerySliderVideo;

class GallerySliderVideo_Slider extends Widget {
  constructor(node) {
    super(node, 'js-slider-gallery--video');

    this.navPrev = this.queryElement('.prev');
    this.navNext = this.queryElement('.next');
    this.slider = this.queryElement('.slider');
    this.swiper = null;

    this.events();
  }

  events() {
    this.swiperSetup();
  }

  swiperSetup() {
    this.initSwiper();
    this.onClick();
  }

  onClick() {
    this.navNext.addEventListener('click', () => {
      this.swiper.slideNext();
    })
    this.navPrev.addEventListener('click', () => {
      this.swiper.slidePrev();
    })
  }

  initSwiper() {
    this.swiper = new Swiper(this.slider, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      useCSS3Transforms: false,
      breakpoints: {
        768: {
          slidesPerView: 'auto',
        },
      },
    });
  }

  static init(el) {
    new GallerySliderVideo_Slider(el);
  }
}
