class SubscribeForm extends Widget {
  constructor(node) {
    super(node, 'js-subscribe-form');

    this.$close = this.queryElement('.close');

    this.events();
  }


  events() {
    if (this.isWatchedByUser !== null) return;
    this.$node.classList.add('visible');

    this.$close.addEventListener('click', () => {
      this.$node.classList.remove('visible');
      this.$node.addEventListener('transitionend', () => this.$node.remove());
      localStorage.setItem('isSubscribePopupWatched', 'true');
    });
  }

  get isWatchedByUser() {
    return localStorage.getItem('isSubscribePopupWatched');
  }

  static init(el) {
    new SubscribeForm(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-subscribe-form').forEach(item => SubscribeForm.init(item))
});
