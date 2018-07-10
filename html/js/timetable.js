function insert_iframe_youtube(lesson_element, url_media) {
  if (lesson_element.getElementsByClassName('media__iframe').length > 0) {
    return false;
  }

  var iframe = document.createElement('iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.classList.add('media__iframe')

  media = lesson_element.getElementsByClassName('content__media');
  if (media.length !== 1) {
    return false;
  }

  iframe.setAttribute('src', media[0].dataset.url);
  media[0].appendChild(iframe)
}

function hide_lessons_descriptions() {
  descriptions = document.getElementsByClassName('lesson__description');
  for (var i = 0; i < descriptions.length; i++) {
    descriptions[i].classList.add('lesson__description--hidden')
  }
}


function switch_lesson_description () {
  description = this.getElementsByClassName('lesson__description');

  if (description[0].classList.contains('lesson__description--hidden') === true) {
    hide_lessons_descriptions();
    description[0].classList.remove('lesson__description--hidden');
    insert_iframe_youtube(this, 'https://www.youtube.com/embed/_bkh2EDjfQ0');
  } else {
    hide_lessons_descriptions();
  }
  return false;
}


function disable_buttons(element) {
  buttons = element.getElementsByClassName('buttons-month__item');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('buttons-month__item--active');
  }
}


function show_month_lesson(month, count_lessons_in_month) {

  lessons = document.getElementsByClassName('lessons__item');
  for (var i = 0; i < lessons.length; i++) {
    lessons[i].classList.add('lessons__item--hidden');
  }
  var end_lesson_in_month = count_lessons_in_month * month;
  var begin_lesson_in_month = end_lesson_in_month - count_lessons_in_month;

  if (lessons.length < begin_lesson_in_month) {
    return null;
  }
  if (lessons.length < end_lesson_in_month) {
    end_lesson_in_month = lessons.length;
  }
  for (var i = begin_lesson_in_month; i < end_lesson_in_month; i++) {
    lessons[i].classList.remove('lessons__item--hidden');
  }
}


function switch_month_lesson() {
  var count_lessons_in_month = 4
  disable_buttons(this.parentNode);
  this.classList.add('buttons-month__item--active');

  for (var i = 0; i < this.classList.length; i++) {
    if (this.classList[i].indexOf('month-') === 0) {
      // 'month-'.length === 6
      var month = parseInt(this.classList[i].slice(6), 10)
      show_month_lesson(month, count_lessons_in_month)
    }
  }
}


// Навешиваем хендлеры на нажатие на заголовок урока
var lesson_titles = document.getElementsByClassName('lesson-tittle__text');
for (var i = 0; i < lesson_titles.length; i++) {
  lesson_titles[i].addEventListener('click', switch_lesson_description.bind(lesson_titles[i].parentNode));
}

// Навешиваем хендлеры на нажатие на кнопки выбора месяца
var buttons_month = document.getElementsByClassName('buttons-month__item');
for (var i = 0; i < buttons_month.length; i++) {
  buttons_month[i].addEventListener('click', switch_month_lesson.bind(buttons_month[i]));
}
