class Validation {
  static validateForm(form) {
    let inputs = form.querySelectorAll('[data-validation]');
    inputs.forEach((input) => {
      Validation.validateInput(input);
    });
  }

  static isFormValid(form) {
    let valid = true;
    let inputs = form.querySelectorAll('[data-validation]');

    inputs.forEach((input) => {
      if (!valid) Validation.validateInput(input);
      valid = Validation.validateInput(input);
    });

    return valid;
  }

  static validateInput(input) {
    let errors = Validation.getInputErrors(input);
    let label = input.parentNode;

    if (errors.length > 0) {
      if (!label.classList.contains('error')) {
        Validation.addErrorMessage(input, errors[0]);
        Validation.addErrorClass(input);
      } else {
        Validation.updateErrorMessage(input, errors[0]);
      }

      return false;
    } else {
      Validation.removeErrorMessage(input);
      Validation.removeErrorClass(input);

      return true;
    }
  }

  static addErrorClass(input) {
    let label = input.parentNode;
    label.classList.add('error');
  }

  static addErrorMessage(input, error) {
    let label = input.parentNode;
    let message = document.createElement('span');
    message.className = 'form-message';
    message.innerHTML = error;
    label.append(message);
  }

  static updateErrorMessage(input, error) {
    let label = input.parentNode;
    label.getElementsByClassName('form-message')[0].innerHTML = error;
  }

  static removeErrorMessage(input) {
    let label = input.parentNode;
    if (label.classList.contains('error')) {
      let message = label.getElementsByClassName('form-message')[0];
      label.removeChild(message);
    }
  }

  static removeErrorClass(input) {
    let label = input.parentNode;
    if (label.classList.contains('error')) {
      label.classList.remove('error');
    }
  }

  static getInputErrors(input) {
    let errors = [];
    let rules = input.getAttribute('data-validation').split(',');
    rules.forEach((rule) => {
      let error = Validation[rule](input);
      if (error) {
        errors.push(error);
      }
    });
    return errors;
  }

  static isNotEmpty(input) {
    if (!input.value) {
      return 'Please, enter your ' + input.getAttribute('name');
    }
  }

  static isValidEmail(input) {
    let regex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!regex.test(input.value)) {
      return 'Please, enter a valid email';
    }
  }

  static init() {
    let inputs = document.querySelectorAll('[data-validation]');
    inputs.forEach((input) => {
      let label = input.parentNode;
      // input.addEventListener('focusout', () => {
      //   Validation.validateInput(input);
      // });
      input.addEventListener('change', () => {
        if (label.classList.contains('error')) {
          Validation.validateInput(input);
        }
      });
      input.addEventListener('input', () => {
        if (label.classList.contains('error')) {
          Validation.validateInput(input);
        }
      });
    });
  }
}

Validation.init();
window.Validation = Validation;
