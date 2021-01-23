class Ticket extends Widget {
  constructor(node) {
    super(node, 'js-ticket');

    this.$video = this.queryElement('.video');

    this.onHoverOn = this.onHoverOn.bind(this);
    this.onHoverOut = this.onHoverOut.bind(this);

    this.events();
  }

  events() {
    this.$node.addEventListener('mouseover', this.onHoverOn);
    this.$node.addEventListener('touchstart', this.onHoverOn);
    this.$node.addEventListener('mouseout', this.onHoverOut);
    this.$node.addEventListener('touchend', this.onHoverOut);
  }

  onHoverOn() {
    this.$video.play();
  }

  onHoverOut() {
    this.$video.pause();
  }

  static init(el) {
    el && new Ticket(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-ticket').forEach(item => Ticket.init(item));
});
