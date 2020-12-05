class CollectionGrid extends Widget{
  constructor(node) {
    super(node, '.js-collection-group');
    this.items = this.queryElements('.item');
    this.images = this.queryElements('.item img');

    this.events();
  }

  events() {
    this.checkImageHeight();
  }

  checkImageHeight() {
    function getMeta(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    }

    async function run(incoming_url, index, element) {
      const img = await getMeta(incoming_url);
      const w = img.width;
      const h = img.height;
      const aspectR = h / w;
      const resultRows = Math.floor(aspectR * 400 / 10);
      element.style.gridRowEnd = `span ${resultRows}`;
    }

    this.images.forEach((item, index) => {
      run(item.dataset.original, index, this.items[index])
    });
  }


  static init(el) {
   el && new CollectionGrid(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-collection-group').forEach(item => CollectionGrid.init(item));
})
