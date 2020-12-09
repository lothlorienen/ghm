class SliderThumbs extends Widget {
  constructor(node) {
    super(node, '.js-slider-thumbs');

    this.$childs = this.$node.children;
    this.slidesArray_Master = [];
    this.slidesArray_Thumbs = [];

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
    this.prepareItems();
    // Очищаем исходную разметку
    this.clearInitialHtml();
    // Вставляем в разметку
    this.generateSliderHtml();
    //
    this.events();
  }

  prepareItems() {
    for (let i = 0; i < this.$childs.length; i++) {
      if (this.$childs[i].tagName.toLowerCase() === 'iframe') {
        // iframe
        const iframeWrapper = document.createElement('div');

        iframeWrapper.classList.add('swiper-slide');
        iframeWrapper.insertAdjacentHTML('beforeend', this.$childs[i].outerHTML);
        const iframeResult = iframeWrapper.outerHTML;

        // Image
        const imgWrapper = document.createElement('div');
        const img = document.createElement('img');
        const icon = document.createElement('span');

        imgWrapper.classList.add('swiper-slide');
        icon.classList.add('slider-thumbs__video-icon');
        this.$childs[i].dataset.posterSrc ? img.src = this.$childs[i].dataset.posterSrc : null;
        this.$childs[i].dataset.posterAlt ? img.alt = this.$childs[i].dataset.posterAlt : null;
        imgWrapper.insertAdjacentElement('beforeend', icon);
        imgWrapper.insertAdjacentElement('beforeend', img);
        const result = imgWrapper.outerHTML;

        this.slidesArray_Master.push(iframeResult);
        this.slidesArray_Thumbs.push(result);
      } else {
        const wrapper = document.createElement('div');
        const img = document.createElement('img');
        const childImg = this.$childs[i].querySelector('img');

        wrapper.classList.add('swiper-slide');
        childImg.dataset.original ? img.src = childImg.dataset.original : img.src = childImg.src;
        img.alt = childImg.alt;
        wrapper.insertAdjacentElement('beforeend', img);

        const result = wrapper.outerHTML;
        this.slidesArray_Master.push(result);
        this.slidesArray_Thumbs.push(result);
      }
    }
  }

  clearInitialHtml() {
    while (this.$node.firstChild) {
      this.$node.removeChild(this.$node.firstChild);
    }
  }

  generateSliderHtml() {
    const slidesMaster = `${this.slidesArray_Master.join('')}`;
    const slidesThumbs = `${this.slidesArray_Thumbs.join('')}`;
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
        ${slidesMaster}
      </div>
     `);

    this.sliderThumbs.insertAdjacentHTML('beforeend', `
      <div class="swiper-wrapper">
        ${slidesThumbs}
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
  }

  initSwipers() {
    this.prevSlide = this.queryElement('.prev');
    this.nextSlide = this.queryElement('.next');

    this.swiperThumbs = new Swiper(this.sliderThumbs, {
      spaceBetween: 10,
      slidesPerView: 'auto',
      // freeMode: true,
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

  static init(el) {
    new SliderThumbs(el);
  }
}

window.SliderThumbs = SliderThumbs;