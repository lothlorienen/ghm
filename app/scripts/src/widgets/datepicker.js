import {Russian} from "flatpickr/dist/l10n/ru";

class Datepicker extends Widget {
  constructor(node) {
    super(node, '.js-datepicker');

    this.$input = this.queryElement('.input');
    this.$clearBtn = this.queryElement('.clear');

    this.picker = null;

    this.init();
  }

  build() {
    !this.$node.classList.contains('custom-calendar--outline')
      ? this.picker = flatpickr(this.$input, this.defaultOptions)
      : this.picker = flatpickr(this.$input, this.withSingleFieldOptions);

    this.$input.addEventListener('keydown', e => {
      e.preventDefault();

      if (e.keyCode === 8) this.$node.value = '';
    });

    this.$input.addEventListener('change', e => {
      const value = e.target.value;

      value ? this.$node.classList.add('filled') : this.$node.classList.remove('filled');

      this.$input.setAttribute('data-value', value.split('-').reverse().join('.'));
    });

    this.$clearBtn.addEventListener('click', e => {
      const target = e.target;

      if (target.closest('.js-datepicker__clear')) {
        this.picker.clear();
        this.$input.removeAttribute('data-value');
      }
    });
  }

  get defaultOptions() {
    return {
      disableMobile: "true",
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      locale: Russian,
      nextArrow: '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M5.45712 14.9572L4.04291 13.5429L9.8358 7.75005L4.04291 1.95715L5.45712 0.54294L12.6642 7.75005L5.45712 14.9572Z" fill="currentColor"/>\n' +
        '</svg>\n',
      prevArrow: '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5429 0.542847L11.9571 1.95706L6.1642 7.74995L11.9571 13.5428L10.5429 14.9571L3.33577 7.74995L10.5429 0.542847Z" fill="currentColor"/>\n' +
        '</svg>\n',
    }
  }

  get withSingleFieldOptions() {
    return {
      disableMobile: "true",
      dateFormat: "Y-m-d",
      locale: Russian,
      nextArrow: '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M5.45712 14.9572L4.04291 13.5429L9.8358 7.75005L4.04291 1.95715L5.45712 0.54294L12.6642 7.75005L5.45712 14.9572Z" fill="currentColor"/>\n' +
        '</svg>\n',
      prevArrow: '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5429 0.542847L11.9571 1.95706L6.1642 7.74995L11.9571 13.5428L10.5429 14.9571L3.33577 7.74995L10.5429 0.542847Z" fill="currentColor"/>\n' +
        '</svg>\n',
    }
  }

  static init(el) {
    new Datepicker(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-datepicker').forEach(item => Datepicker.init(item));
});