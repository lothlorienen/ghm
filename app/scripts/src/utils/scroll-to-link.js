class ScrollToLink {
  constructor(node) {
    this.$node = node;
    this.targetElement = document.querySelector(this.$node.getAttribute('href') || this.$node.dataset.scrollTarget);

    if (!this.targetElement) return null;

    this.init();
  }

  init() {
    this.$node.addEventListener('click', e => {
      e.preventDefault();

      setTimeout(() => {
        raf2x(() => startScrollTo(this.targetElement));
      });
    });
  }
}

class ScrollToTop {
  constructor(nodeElement) {
    this.nodeElement = nodeElement;

    this.init();
  }

  checkPosition() {
    if (!isMobileLayout()) return;

    window.innerHeight < getScrollPos()
      ? this.nodeElement.classList.add('active')
      : this.nodeElement.classList.remove('active')
  }

  init() {
    onScroll(this.checkPosition.bind(this));
    onResize(this.checkPosition.bind(this));

    this.nodeElement.addEventListener('click', e => {
      e.preventDefault();

      setTimeout(() => {
        raf2x(() => startScrollTo(document.documentElement));
      });
    });
  }
}

class ScrollToSearch {
  constructor(node) {
    this.$node = node;

    this.init();
  }

  init() {
    this.$node.addEventListener('click', e => {
      e.preventDefault();

      setTimeout( () => raf2x(() => startScrollTo(document.body)), 0);
      setTimeout(() => document.querySelector('.js-header-search__open').click(), 500);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-scroll-to').forEach(element => new ScrollToLink(element));
  document.querySelectorAll('.js-scroll-to-top').forEach(element => new ScrollToTop(element));
  document.querySelectorAll('.js-scroll-to-search').forEach(element => new ScrollToSearch(element));
});

window.ScrollToLink = ScrollToLink;
