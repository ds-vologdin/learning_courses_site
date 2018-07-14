function show_dropdown_menu() {
  let dropdown_menu = this.getElementsByClassName('dropdown-js');
  if (dropdown_menu.length === 0) {
    return null
  }
  dropdown_menu[0].classList.remove('dropdown-hide');
}

function hide_dropdown_menu() {
  let dropdown_menu = this.getElementsByClassName('dropdown-js');
  if (dropdown_menu.length === 0) {
    return null
  }
  dropdown_menu[0].classList.add('dropdown-hide');
}

export let set_handler_main_menu = () => {
  // Навешиваем хендлеры на нажатие на заголовок урока
  let dropdown_menus = document.getElementsByClassName('dropdown-js-control');
  if (dropdown_menus.length > 0) {
    for (let i = 0; i < dropdown_menus.length; i++) {
      dropdown_menus[i].addEventListener('mouseover', show_dropdown_menu.bind(dropdown_menus[i]));
      dropdown_menus[i].addEventListener('mouseout', hide_dropdown_menu.bind(dropdown_menus[i]));
    }
  }
}
