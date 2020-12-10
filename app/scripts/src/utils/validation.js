class Validation {
  static validateForm(form) {
    const inputs = form.querySelectorAll('[data-validation]');
    inputs.forEach((input) => {
      Validation.validateInput(input);
    });
  }

  static isFormValid(form) {
    const arr = [];
    const inputs = form.querySelectorAll('[data-validation]');

    inputs.forEach((input) => {
      const valid = Validation.validateInput(input);
      arr.push(valid);
    });

    const result = [... new Set(arr)];

    return result.length <= 1 && result[0] === true;
  }

  static validateInput(input) {
    const errors = Validation.getInputErrors(input);
    const label = input.parentNode;

    console.log(errors);
    if (errors.length > 0) {
      if (!label.classList.contains('error')) {
        // Validation.addErrorMessage(input, errors[0]);
        Validation.addErrorClass(input);
      } else {
        // Validation.updateErrorMessage(input, errors[0]);
      }

      return false;
    } else {
      // Validation.removeErrorMessage(input);
      Validation.removeErrorClass(input);

      return true;
    }
  }

  static addErrorClass(input) {
    const label = input.parentNode;
    label.classList.add('error');
  }

  static addErrorMessage(input, error) {
    const label = input.parentNode;
    const message = document.createElement('span');
    message.className = 'form-message';
    message.innerHTML = error;
    label.append(message);
  }

  static updateErrorMessage(input, error) {
    const label = input.parentNode;
    label.getElementsByClassName('form-message')[0].innerHTML = error;
  }

  static removeErrorMessage(input) {
    const label = input.parentNode;
    if (label.classList.contains('error')) {
      const message = label.getElementsByClassName('form-message')[0];
      label.removeChild(message);
    }
  }

  static removeErrorClass(input) {
    const label = input.parentNode;
    if (label.classList.contains('error')) {
      label.classList.remove('error');
    }
  }

  static getInputErrors(input) {
    const errors = [];
    const rules = input.getAttribute('data-validation').split(',');
    rules.forEach((rule) => {
      const error = Validation[rule](input);
      if (error) {
        errors.push(error);
      }
    });

    return errors;
  }

  static isNotEmpty(input) {
    if (!input.value) {
      return 'Пожалуйста, введите корректные данные';
    }
  }

  static isValidEmail(input) {
    const regex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!regex.test(input.value)) {
      return 'Пожалуйста, введите корректный e-mail.';
    }
  }

  static isValidPhone(input) {
    const regex = RegExp(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g);
    if (!regex.test(input.value)) {
      return 'Пожалуйста, введите корректный номер телефона.';
    }
  }

  static init() {
    const inputs = document.querySelectorAll('[data-validation]');
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

document.addEventListener('DOMContentLoaded', () => Validation.init());

window.Validation = Validation;
