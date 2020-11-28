class MobileHeightFix extends Widget {
  constructor(node) {
    super(node, '.js-mobile-height-fix', 'tablet-mobile');

    this.setHeight = this.setHeight.bind(this);
    this.value = (Number(this.$node.dataset.vhValue) / 100) || 1;

    this.init();
  }

  setHeight() {
    this.$node.style.height = `${window.innerHeight * this.value}px`;
  }

  build() {
    this.setHeight();
  }

  destroy() {
    this.$node.style.height = ``;
  }

  static init(el) {
    el && new MobileHeightFix(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-mobile-height-fix').forEach(item => MobileHeightFix.init(item));
});

window.MobileHeightFix = MobileHeightFix;
