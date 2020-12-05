class CollectionGrid extends Widget {
  constructor(node) {
    super(node, '.js-collection-grid');
    this.items = this.queryElements('.item');
    this.images = this.queryElements('.item img');

    this.events();
  }

  events() {
    this.resizeAllGridItems();

    this.images.forEach((img, idx) => {
      img.addEventListener("load", () => {
        this.resizeGridItem(this.items[idx], img);
        this.items[idx].classList.add('loaded');
      });
    });
  }

  resizeGridItem(item, image) {
    const rowHeight = parseInt(window.getComputedStyle(this.$node).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(this.$node).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.round((image.naturalHeight + rowGap) / (rowHeight + rowGap));

    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  resizeAllGridItems() {
    this.items.forEach((item, i) => this.resizeGridItem(item, this.images[i]))
  }

  static init(el) {
    el && new CollectionGrid(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-collection-grid').forEach(item => CollectionGrid.init(item));
})
