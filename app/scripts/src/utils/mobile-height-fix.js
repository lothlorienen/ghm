class MobileHeightFix extends Widget {
  constructor(node) {
    super(node, '.js-mobile-height-fix');

    this.value = (Number(this.$node.dataset.vhValue) / 100) || 1;

    this.events();
    onResize(this.events.bind(this));
  }

  events() {
    Layout.isTabletLayout() ? this.setHeight() : this.removeHeight();
  }

  setHeight() {
    this.$node.style.height = `${window.innerHeight * this.value}px`;
  }

  removeHeight() {
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
