 const show_dropdown_menu = (element) => {
  let dropdown_menu = element.getElementsByClassName('dropdown-js');
  if (dropdown_menu.length === 0) {
    return null
  }
  dropdown_menu[0].classList.remove('dropdown-hide');
}

const hide_dropdown_menu = (element) => {
  let dropdown_menu = element.getElementsByClassName('dropdown-js');
  if (dropdown_menu.length === 0) {
    return null
  }
  dropdown_menu[0].classList.add('dropdown-hide');
}

export const set_handler_main_menu = () => {
  // Навешиваем хендлеры на нажатие на заголовок урока
  let dropdown_menus = document.getElementsByClassName('dropdown-js-control');
  if (dropdown_menus.length > 0) {
    for (let dropdown_menu of dropdown_menus) {
      dropdown_menu.addEventListener('mouseover', event => show_dropdown_menu(dropdown_menu));
      dropdown_menu.addEventListener('mouseout', event => hide_dropdown_menu(dropdown_menu));
    }
  }
}
