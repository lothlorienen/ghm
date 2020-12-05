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
        this.resizeGridItem(this.items[idx]);
        this.items[idx].classList.add('loaded');
      });
    });
  }

  checkImageHeight() {
  }

  resizeGridItem(item) {
    const rowHeight = parseInt(window.getComputedStyle(this.$node).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(this.$node).getPropertyValue('grid-row-gap'));
    console.log('item: ' + (item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap))
    const rowSpan = Math.round((item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    console.log(item.getBoundingClientRect().height)

    item.parentNode.style.gridRowEnd = `span ${rowSpan}`;
  }

  resizeAllGridItems() {
    for (let item of this.items) {
      this.resizeGridItem(item);
    }
  }

  resizeEvents() {
    onResize(this.resizeAllGridItems.bind(this))
  }


  static init(el) {
    el && new CollectionGrid(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-collection-grid').forEach(item => CollectionGrid.init(item));
})
