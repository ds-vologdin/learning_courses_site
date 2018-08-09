const switch_register_form = (element) => {
  let register_form = element.parentNode.parentNode;
  let register_input = register_form.getElementsByClassName('register-content__input-form--register');
  let login_input = register_form.getElementsByClassName('register-content__input-form--login');
  let register_button = register_form.getElementsByClassName('register-header__item--register');
  let login_button = register_form.getElementsByClassName('register-header__item--login');

  if (register_input.length > 0 && login_input.length > 0 && register_button.length > 0 && login_button.length > 0) {
    register_input = register_input[0];
    login_input = login_input[0];
    register_button = register_button[0];
    login_button = login_button[0];
  } else {
    console.log('что-то пошло не так');
    return false;
  }

  if (element.classList.contains('register-header__item--login')) {
    login_button.classList.add('register-header__item--active');
    register_button.classList.remove('register-header__item--active');
    login_input.classList.add('register-content__input-form--active');
    register_input.classList.remove('register-content__input-form--active');

  } else {
    login_button.classList.remove('register-header__item--active');
    register_button.classList.add('register-header__item--active');
    login_input.classList.remove('register-content__input-form--active');
    register_input.classList.add('register-content__input-form--active');
  }
}


const close_register_form = () => {
  let modal_register = document.getElementsByClassName('modal-register');
  if (modal_register.length < 0) {
    console.log('что-то пошло не так, нет формы регистрации...');
    return false;
  }
  modal_register = modal_register[0];
  modal_register.classList.remove('modal-register--show');
}

const show_register_form = () => {
  let modal_register = document.getElementsByClassName('modal-register');
  if (modal_register.length < 0) {
    console.log('что-то пошло не так, нет формы регистрации...');
    return false;
  }
  modal_register = modal_register[0];
  modal_register.classList.add('modal-register--show');
}


export const set_handler_register_form = () => {
  let buttons_select = document.getElementsByClassName('register-header__item');
  if (buttons_select.length > 0) {
    for (let button of buttons_select) {
      button.addEventListener('click', event => switch_register_form(button));
    }
  }
  let close_button_register_form = document.getElementsByClassName('register-content__close')
  if (close_button_register_form.length > 0) {
    close_button_register_form[0].addEventListener('click', close_register_form);
  }

  let menu_register = document.getElementsByClassName('menu-rigth__register');
  if (menu_register.length > 0) {
    menu_register[0].addEventListener('click', show_register_form);
  }
}
