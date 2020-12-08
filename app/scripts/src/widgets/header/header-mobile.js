class HeaderMobile extends Widget {
  constructor(node) {
    super(node, 'js-header',);

    this.opened = false;
    this.mobileInit = false;
    this.$burgerButton = this.queryElement('.burger');
    this.$headerMenu = this.queryElement('.menu');
    this.$headerLinks = this.queryElements('.link');
    this.$headerSubLinks = this.queryElements('.submenu-link');
    this.$headerSubmenu = this.queryElements('.submenu');
    this.$headerSubmenu2 = this.queryElements('.submenu_2');

    this.$sub = this.queryElement('.sub');
    this.$subBack = this.queryElement('.sub_back');
    this.$subTitle = this.queryElement('.sub_title');
    this.prevTitle = '';

    this.onClickLinksEvents = [];
    this.onClickSublinksEvents = [];

    this.onSubBackClick = this.onSubBackClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.resizeEvents = this.resizeEvents.bind(this);

    this.events();
  }

  events() {
    this.resizeEvents();
    onResize(this.resizeEvents);
  }

  resizeEvents() {
    if (!Layout.isTabletLayout() && !this.mobileInit) return null;
    if (!Layout.isTabletLayout() && this.mobileInit) {
      this.removeAll();
      this.close();
      return null;
    }

    this.setup();
  }

  setup() {
    this.$burgerButton.addEventListener('click', this.toggle);
    this.$headerLinks.forEach(link => {
      const event = this.onHeaderLinkClick(link);
      link.addEventListener('click', event);
      this.onClickLinksEvents.push(event);
    });
    this.$headerSubLinks.forEach(subLink => {
      const event = this.onHeaderSubLinkClick(subLink);
      subLink.addEventListener('click', event);
      this.onClickSublinksEvents.push(event);
    });
    this.$subBack.addEventListener('click', this.onSubBackClick);
    this.mobileInit = true;
  }

  removeAll() {
    this.$burgerButton.removeEventListener('click', this.toggle);
    this.$headerLinks.forEach((item, index) => item.removeEventListener('click', this.onClickLinksEvents[index]));
    this.$headerSubLinks.forEach((item, index) => item.removeEventListener('click', this.onClickSublinksEvents[index]));
    this.$subBack.removeEventListener('click', this.onSubBackClick);
  }

  hideDropdowns() {
    if (this.$sub.classList.contains('_submenu_2-opened')) {
      this.$headerSubmenu2.forEach(item => item.classList.contains('visible') ? item.classList.remove('visible') : null);
      this.$headerSubLinks.forEach(item => {
        if (item.classList.contains('hidden')) {
          item.classList.remove('hidden');
          this.$subTitle.innerText = this.prevTitle;
        }
      });
      this.$sub.classList.remove('_submenu_2-opened');
    } else {
      this.$sub.classList.remove('visible');
      this.$headerSubmenu.forEach(item => item.classList.contains('visible') ? item.classList.remove('visible') : null);
      this.$headerLinks.forEach(link => link.classList.contains('hidden') ? link.classList.remove('hidden') : null);
      this.$node.classList.remove('dropdown-opened');
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
      this.prevTitle = this.$subTitle.innerText;
      this.$subTitle.innerText = link.innerText;

      this.$node.classList.add('dropdown-opened');
      this.$headerLinks.forEach(item => item.classList.add('hidden'));

      $dropdown.scrollTop = 0;
    };
  }

  onHeaderSubLinkClick(link) {
    return e => {
      if (!this.opened) return true;

      const $dropdown = link.nextElementSibling;
      if (!$dropdown) return;

      e.preventDefault();

      $dropdown.classList.add('visible');

      this.$sub.classList.add('_submenu_2-opened');
      this.prevTitle = this.$subTitle.innerText;
      this.$subTitle.innerText = link.innerText;

      this.$headerSubLinks.forEach(item => item.classList.add('hidden'));

      $dropdown.scrollTop = 0;
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
    this.$node.classList.remove('dropdown-opened');

    this.$headerMenu.classList.remove('mobile-opened');
    this.$headerLinks.forEach(link => link.classList.contains('hidden') ? link.classList.remove('hidden') : null);
    this.$headerSubmenu.forEach(item => item.classList.contains('visible') ? item.classList.remove('visible') : null);
    this.$headerSubLinks.forEach(item => item.classList.contains('hidden') ? item.classList.remove('hidden') : null);
    this.$headerSubmenu2.forEach(item => item.classList.contains('visible') ? item.classList.remove('visible') : null);

    this.$sub.classList.remove('_submenu_2-opened');
    this.$sub.classList.remove('visible');
    this.$subTitle.innerText = '';

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
