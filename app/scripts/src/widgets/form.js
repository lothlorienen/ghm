class Form extends Widget {
  constructor(node) {
    super(node, '.js-form');

    this.form = this.$node;
    this.container = this.queryElement('.container');
    this.busy = false;
    this.mode = 'submit';
    this.action = this.form.dataset.apiUrl;
    this.inputs = this.form.querySelectorAll('input');
    this.textarea = this.form.querySelector('textarea') || null;
    this.submitButton = this.form.querySelector('button[type=\"submit\"]');

    this.addEvents();
  }

  addEvents() {
    this.form.addEventListener('submit', e => {
      if (this.busy) return e.preventDefault();
      this.busy = true;

      Validation.validateForm(this.form);

      if (Validation.isFormValid(this.form)) {
        this.loading();

        const data = {};
        const queryString = new FormData(this.form);

        for (let [key, value] of queryString.entries()) {
          if (value !== '') data[`${key}`] = `${value}`;
        }

        fetch(this.action, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then(res => {

          this.busy = false;
          this.toSuccess();

          setTimeout(() => {
            this.addSuccessState();
            this.form.reset();
          }, 2600);
        });
      } else {
        this.busy = false;
      }

      e.preventDefault();
    });
  }

  addSuccessState() {
    startScrollTo(document.documentElement);

    if (this.mode === 'submit') {
      console.log('submit')

      while(this.container.firstChild) {
        this.container.firstChild.remove();
      }
      this.container.classList.add('form--success');
      this.container.insertAdjacentHTML('beforeend', `
        <p>Данные успешно отправлены!</p>
      `);

    } else {

      this.mode = 'submit';
    }
  }

  loading() {
    setTimeout(() => {
      this.$node.classList.add('_loading');

      if (this.mode === 'submit') {
        this.submitButton.disabled = true;
        this.inputs.forEach(item => item.disabled = true);
        this.textarea.disabled = true;
      } else {
        this.submitButton.disabled = false;
        this.inputs.forEach(item => item.disabled = false);
        this.textarea.disabled = false;
      }
    }, 300);
  }

  toSuccess() {
    setTimeout(() => {
      // this.section.classList.add('_hide');
    }, 1800);
  }

  static init(element) {
    new Form(element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-form').forEach(item => Form.init(item));
});

window.Form = Form;

