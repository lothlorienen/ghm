class Select extends Widget {
  constructor(node) {
    super(node, 'js-select');


    this.init();
  }

  build() {
    $(this.$node).select2({
      placeholder: 'не выбрано',
      width: '100%',
      minimumResultsForSearch: -1,
      dropdownAutoWidth : true,
    });

    const value = $(this.$node).find('option[selected]');

    if (!value.length) {
      $(this.$node).val('').trigger('change');
    }
  }

  setupSelect2() {

  }

  get defaultStates() {

  }

  static init(el) {
    new Select(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-select').forEach(item => Select.init(item));
});
