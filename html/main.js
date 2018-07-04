function find_first_active_slide(slider_items) {
  // Функция возвращает номер первого активного элемента в слайдере
  // Если нет активных, то возвращает null.
  for (var i = 0; i < slider_items.length; i++) {
    if (slider_items[i].classList.contains('slide_disable') == false) {
      return i;
    }
  }
  return null;
}


function find_last_active_slide(slider_items) {
  // Функция возвращает номер последнего активного элемента в слайдере
  // Если нет активных, то возвращает null.
  for (var i = (slider_items.length - 1); i >= 0; i--) {
    if (slider_items[i].classList.contains('slide_disable') == false) {
      return i;
    }
  }
  return null;
}


function prev_slide_handler() {
  // Обработчик нажатие на стрелочку '<'
  var count_active_slide = 10;
  slider_items = document.getElementsByClassName('swiper_slide');

  numb_first_active_slide = find_first_active_slide(slider_items)
  numb_last_active_slide = find_last_active_slide(slider_items)

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
  var count_active_slide = 10;
  slider_items = document.getElementsByClassName('swiper_slide');

  numb_first_active_slide = find_first_active_slide(slider_items)
  numb_last_active_slide = find_last_active_slide(slider_items)

  if ((numb_first_active_slide === -1) && (numb_last_active_slide === -1)) {
    console.log('Что-то пошло не так! Нет активных элементов.');
    return false
  }

  if (numb_last_active_slide != 0) {
    slider_items[(numb_first_active_slide-1)].classList.remove('slide_disable')
    slider_items[(numb_last_active_slide)].classList.add('slide_disable')
  }
}

// Навешиваем хендлеры на нажатие стрелочек
var arrow_prev = document.getElementsByClassName('work_arrow_prev');
arrow_prev[0].addEventListener('click', prev_slide_handler);

var arrow_next = document.getElementsByClassName('work_arrow_next');
arrow_next[0].addEventListener('click', next_slide_handler);


// Отображение dropdown меню (jquery)
$('.dropdown-js-control').hover(
  function() {
    $(this).find('.dropdown-js').stop(true, true).delay(200).fadeIn();
  },
  function() {
    $(this).find('.dropdown-js').stop(true, true).delay(200).fadeOut();
  })
