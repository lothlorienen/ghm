class Sliders {
  constructor() {
    document.querySelectorAll('.js-slider-partners').forEach(item => PartnersSlider.init(item))
  }

  static init() {
    new Sliders();
  }
}

document.addEventListener('DOMContentLoaded', () => Sliders.init());
