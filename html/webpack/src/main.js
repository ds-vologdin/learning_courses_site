function find_first_active_slide(slider_items) {
  // Функция возвращает номер первого активного элемента в слайдере
  // Если нет активных, то возвращает null.
  for (let i = 0; i < slider_items.length; i++) {
    if (slider_items[i].classList.contains('slide_disable') == false) {
      return i;
    }
  }
  return null;
}


function find_last_active_slide(slider_items) {
  // Функция возвращает номер последнего активного элемента в слайдере
  // Если нет активных, то возвращает null.
  for (let i = (slider_items.length - 1); i >= 0; i--) {
    if (slider_items[i].classList.contains('slide_disable') == false) {
      return i;
    }
  }
  return null;
}


function prev_slide_handler() {
  // Обработчик нажатие на стрелочку '<'
  let count_active_slide = 10;
  let slider_items = document.getElementsByClassName('swiper_slide');

  let numb_first_active_slide = find_first_active_slide(slider_items)
  let numb_last_active_slide = find_last_active_slide(slider_items)

  if ((numb_first_active_slide === -1) && (numb_last_active_slide === -1)) {
    console.log('Что-то пошло не так! Нет активных элементов.');
    return false
  }

  if (numb_last_active_slide != slider_items.length-1) {
    slider_items[(numb_first_active_slide)].classList.add('slide_disable')
    slider_items[(numb_last_active_slide+1)].classList.remove('slide_disable')
  }
}


function next_slide_handler() {
  // Обработчик нажатие на стрелочку '>'
  let count_active_slide = 10;
  let slider_items = document.getElementsByClassName('swiper_slide');

  let numb_first_active_slide = find_first_active_slide(slider_items)
  let numb_last_active_slide = find_last_active_slide(slider_items)

  if ((numb_first_active_slide === -1) && (numb_last_active_slide === -1)) {
    console.log('Что-то пошло не так! Нет активных элементов.');
    return false
  }

  if (numb_last_active_slide != 0) {
    slider_items[(numb_first_active_slide-1)].classList.remove('slide_disable')
    slider_items[(numb_last_active_slide)].classList.add('slide_disable')
  }
}


export let set_handler_main_page_arrow = () => {
  // Навешиваем хендлеры на нажатие стрелочек
  let arrow_prev = document.getElementsByClassName('work_arrow_prev');
  if (arrow_prev.length > 0) {
    arrow_prev[0].addEventListener('click', prev_slide_handler);
  }

  let arrow_next = document.getElementsByClassName('work_arrow_next');
  if (arrow_next.length > 0) {
    arrow_next[0].addEventListener('click', next_slide_handler);
  }
}
