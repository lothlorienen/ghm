class HeaderMobile extends Widget {
  constructor(node) {
    super(node, 'js-header');

    this.opened = false;
    this.$burgerButton = this.queryElement('.burger');
    this.$headerMenu = this.queryElement('.menu');
    this.$headerLinks = this.queryElements('.link');
    this.$headerSubLinks = this.queryElements('.submenu-link');
    this.$headerSubmenu = this.queryElements('.submenu');

    this.$sub = this.queryElement('.sub');
    this.$subBack = this.queryElement('.sub_back');
    this.$subTitle = this.queryElement('.sub_title');

    this.events();
  }

  events() {
    this.$burgerButton.addEventListener('click', () => this.toggle());
    this.$headerLinks.forEach(headerLink => headerLink.addEventListener('click', this.onHeaderLinkClick(headerLink)));
    this.$headerSubLinks.forEach(subLink => subLink.addEventListener('click', this.onHeaderSubLinkClick(subLink)));
    this.$subBack.addEventListener('click', this.onSubBackClick.bind(this));
  }

  hideDropdowns() {
    if (this.$sub.classList.contains('_level-2-opened')) {
      this.$headerSubmenu.forEach(item => item.classList.contains('visible') ? item.classList.remove('visible') : null);
      this.$node.classList.remove('dropdown-opened');
      this.$headerLinks.forEach(item => item.style.color = '');
    }
    else {
      this.$sub.classList.remove('visible');
      this.$headerSubmenu.forEach(item => item.classList.contains('visible') ? item.classList.remove('visible') : null);
      this.$node.classList.remove('dropdown-opened');
      this.$headerLinks.forEach(item => item.style.color = '');
    }
  }

  onSubBackClick(e) {
    e.preventDefault();
    this.hideDropdowns();
  }

  onHeaderLinkClick(link) {
    return e => {
      if (!this.opened) return true;

      const $dropdown = link.nextElementSibling;
      if (!$dropdown) return;

      e.preventDefault();

      $dropdown.classList.add('visible');

      this.$sub.classList.add('visible');
      this.$subTitle.innerText = link.innerText;

      this.$node.classList.add('dropdown-opened');

      $dropdown.scrollTop = 0;
    };
  }

  onHeaderSubLinkClick(link) {
    return e => {
      e.preventDefault();

      if (!this.opened) return true;

      const $dropdown = link.nextElementSibling;
      if (!$dropdown) return;

      $dropdown.classList.add('visible');
      this.$subTitle.innerText = link.innerText;
      $dropdown.scrollTop = 0;
      this.$sub.classList.add('_level-2-opened');
      this.$headerLinks.forEach(item => item.style.color = 'transparent');
    };
  }

  open() {
    this.$burgerButton.classList.add('opened');
    this.$node.classList.add('mobile-opened');
    this.$node.classList.add('header--filled');
    this.$headerMenu.classList.add('mobile-opened');
    this.opened = true;
    this.$headerMenu.scrollTop = 0;
    hideScrollbar();
  }

  close() {
    this.$burgerButton.classList.remove('opened');
    this.$node.classList.remove('mobile-opened');
    this.$node.classList.remove('header--filled');
    this.$headerMenu.classList.remove('mobile-opened');
    this.opened = false;
    showScrollbar();

    this.hideDropdowns();
  }

  toggle() {
    this.opened ? this.close() : this.open();
  }

  static init(el) {
    new HeaderMobile(el);
  }
}

window.HeaderMobile = HeaderMobile;
