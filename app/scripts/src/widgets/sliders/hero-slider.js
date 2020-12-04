class HeroSlider extends Widget {
  constructor(node) {
    super(node, 'js-slider-hero');

    this.slider = this.queryElement('.slider');
    this.pagination = this.queryElement('.pagination');
    this.navPrev = this.queryElement('.prev');
    this.navNext = this.queryElement('.next');
    // this.sectionBgWrapper = this.queryElement('.bgs');

    this.images = null;
    this.swiper = null;

    this.events();
  }

  events() {
    // this.setupSectionBg();
    this.initSwiper();
    this.onClick();
    // this.changeSectionBg();
    // this.onSlideChange();
  }

  onClick() {
    this.navNext.addEventListener('click', () => {
      this.swiper.slideNext();
    });

    this.navPrev.addEventListener('click', () => {
      this.swiper.slidePrev();
    });
  }

  initSwiper() {
    this.swiper = new Swiper(this.slider, {
      loop: true,
      autoplay: {
        delay: 7500,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      pagination: {
        el: this.pagination,
        clickable: true,
      },
    });
  }

  onSlideChange() {
    const imagesDub = this.images;

    this.swiper.on('slideChange', function () {
      imagesDub.forEach(item => item.classList.remove('active'));
      imagesDub[this.realIndex].classList.add('active');
    });
  }

  setupSectionBg() {
    this.sectionBgWrapper.insertAdjacentHTML('beforeend', this.imagesArray.join(''));

    this.images = this.sectionBgWrapper.querySelectorAll('.main-hero__bg');
  }

  changeSectionBg() {
    this.images.forEach(item => item.classList.remove('active'));
    this.images[this.swiper.realIndex].classList.add('active');
  }

  get imagesArray() {
    const images = []
    const tmpImagesWrapper = this.$node.querySelectorAll('.hero-slide__bg');

    if (tmpImagesWrapper.length > 0) {
      for (let item of tmpImagesWrapper) {
        images.push(`<div class="main-hero__bg">${item.innerHTML.toString()}</div>`);
        item.remove();
      }
    }

    return images;
  }

  static init(el) {
    el && new HeroSlider(el);
  }
}

window.HeroSlider = HeroSlider;