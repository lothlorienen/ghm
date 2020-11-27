class Sliders {
  constructor() {
    document.querySelector('.js-slider-partners')
      ? document.querySelectorAll('.js-slider-partners').forEach(item => PartnersSlider.init(item))
      : null;
    document.querySelector('.js-slider-gallery')
      ? document.querySelectorAll('.js-slider-gallery').forEach(item => GallerySlider.init(item))
      : null;
  }

  static init() {
    new Sliders();
  }
}

document.addEventListener('DOMContentLoaded', () => Sliders.init());
