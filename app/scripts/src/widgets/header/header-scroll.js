class HeaderScroll extends Widget {
  constructor(node) {
    super(node);

    this.isFixed = false;

    this.events();

    this.update();
    this.updateHeight();
  }

  events() {
    onScroll(this.onScroll.bind(this));
    onResize(this.onResize.bind(this));

    Layout.addListener(this.onChangeLayout.bind(this));
  }

  onChangeLayout() {
    this.update();
    this.updateHeight();
  }

  destroy() {
    this.setHeaderAsNotFixed();
  }

  setHeaderAsFixed() {
    if (this.isFixed) return;
    this.isFixed = true;

    this.$node.classList.add('fixed');
  }

  setHeaderAsNotFixed() {
    if (!this.isFixed) return;
    this.isFixed = false;

    !this.$node.classList.contains('header--main') ? document.body.classList.remove('header-fixed') : null;
    this.$node.classList.remove('fixed-prepare');
    this.$node.classList.remove('fixed');
  }

  update() {
    const scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

    if (this.$node.classList.contains('header--main')) {
      if (scrollTop > (Layout.isTabletLayout() ? window.innerHeight : 650)) {
        this.setHeaderAsFixed();
      } else {
        this.setHeaderAsNotFixed();
      }

      if ((!this.isFixed && scrollTop) > (this.baseBeight && !document.body.classList.contains('header-fixed'))) {
        this.$node.classList.add('fixed-prepare');
      }

      if (scrollTop <= (Layout.isTabletLayout() ? (window.innerHeight * 0.9) : (650 * 0.9))) {
        this.$node.classList.remove('fixed-prepare');
        document.body.classList.remove('header-fixed');
      }
    }
    else {
      if (scrollTop > this.baseBeight + 1) {
        this.$node.classList.add('fixed-prepare');
        document.body.classList.add('header-fixed')
        this.setHeaderAsFixed();
      } else {
        this.setHeaderAsNotFixed();
      }

      if (scrollTop <= this.baseBeight) {
        this.$node.classList.remove('fixed-prepare');
        document.body.classList.remove('header-fixed');
      }
    }
  }

  updateHeight() {
    this.baseBeight = this.$node.offsetHeight;
  }

  onScroll() {
    if (this.$node.classList.contains('mobile-opened')) return null;

    this.update();
  }

  onResize() {
    if (this.$node.classList.contains('mobile-opened')) return null;

    this.updateHeight();
  }

  static init(el) {
    new HeaderScroll(el);
  }
}

window.HeaderScroll = HeaderScroll;
