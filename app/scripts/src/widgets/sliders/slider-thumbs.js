class SliderThumbs extends Widget {
  constructor(node) {
    super(node, '.js-slider-thumbs');

    this.images = this.$node.querySelectorAll('img');
    this.slidesArray = [];

    this.sliderMaster = null;
    this.sliderThumbs = null;

    this.swiperMaster = null;
    this.swiperThumbs = null;

    this.prevSlide = null;
    this.nextSlide = null;

    this.init();
  }

  build() {
    // Подготавливаем изображения для вставки в слайдер
    this.prepareImages();
    // Очищаем исходную разметку
    this.clearInitialHtml();
    // Вставляем в разметку
    this.generateSliderHtml();
    //
    this.events();
  }

  prepareImages() {
    this.images.forEach(item => {
      const wrapper = document.createElement('div');
      const img = document.createElement('img');

      wrapper.classList.add('swiper-slide');
      item.dataset.original ? img.src = item.dataset.original : img.src = item.src;
      img.alt = item.alt;
      wrapper.insertAdjacentElement('beforeend', img);

      const result = wrapper.outerHTML;
      this.slidesArray.push(result);
    });
  }

  clearInitialHtml() {
    while (this.$node.firstChild) {
      this.$node.removeChild(this.$node.firstChild);
    }
  }

  generateSliderHtml() {
    const slides = `${this.slidesArray.join('')}`;
    this.sliderMaster = document.createElement('div');
    this.sliderThumbs = document.createElement('div');

    this.sliderMaster.classList.add('slider-thumbs__master');
    this.sliderMaster.classList.add('swiper-container');
    this.sliderMaster.classList.add('js-slider-thumbs__master');
    this.sliderThumbs.classList.add('slider-thumbs__thumbs');
    this.sliderThumbs.classList.add('swiper-container');
    this.sliderThumbs.classList.add('js-slider-thumbs__thumbs');

    this.sliderMaster.insertAdjacentHTML('beforeend', `
      <div class="swiper-wrapper">
        ${slides}
      </div>
     `);

    this.sliderThumbs.insertAdjacentHTML('beforeend', `
      <div class="swiper-wrapper">
        ${slides}
      </div>
     `);

    this.$node.insertAdjacentElement('beforeend', this.sliderMaster);
    this.$node.insertAdjacentElement('beforeend', this.sliderThumbs);
    this.$node.insertAdjacentHTML('beforeend', `
      <div class="slider-thumbs__nav">
        <button class="slider-thumbs__nav-item swiper-button-prev js-slider-thumbs__prev" type="button">
          <span class="arrow arrow-left">
            <svg class="icon icon-arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href=${this.$node.dataset.spriteUrl}#arrow></use>
            </svg>
          </span>
        </button>
        <button class="slider-thumbs__nav-item swiper-button-next js-slider-thumbs__next" type="button">
          <span class="arrow arrow-right">
            <svg class="icon icon-arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href=${this.$node.dataset.spriteUrl}#arrow></use>
            </svg>
          </span>
        </button>
      </div>
     `);
  }

  events() {
    this.initSwipers();
    this.onButtonClick();
  }

  initSwipers() {
    this.prevSlide = this.queryElement('.prev');
    this.nextSlide = this.queryElement('.next');

    this.swiperThumbs = new Swiper(this.sliderThumbs, {
      spaceBetween: 10,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });

    this.swiperMaster = new Swiper(this.sliderMaster, {
      spaceBetween: 10,
      navigation: {
        nextEl: this.nextSlide,
        prevEl: this.prevSlide,
      },
      thumbs: {
        swiper: this.swiperThumbs,
      },
    });
  }

  onButtonClick() {
    this.prevSlide.addEventListener('click', () => {
      this.swiperMaster.slidePrev()
    });
    this.nextSlide.addEventListener('click', () => {
      this.swiperMaster.slideNext()
    });
  }

  static init(el) {
    new SliderThumbs(el);
  }
}

window.SliderThumbs = SliderThumbs;