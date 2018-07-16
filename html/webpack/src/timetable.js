const COUNT_LESSONS_IN_MONTH = 4

function insert_iframe_youtube(lesson_element) {
  if (lesson_element.getElementsByClassName('media__iframe').length > 0) {
    return false;
  }

  let iframe = document.createElement('iframe');
  iframe.setAttribute('frameborder', '0');
  iframe.classList.add('media__iframe')

  let media = lesson_element.getElementsByClassName('content__media');
  if (media.length !== 1) {
    return false;
  }

  iframe.setAttribute('src', media[0].dataset.url);
  media[0].appendChild(iframe)
}

function hide_lessons_descriptions() {
  let descriptions = document.getElementsByClassName('lesson__description');
  for (let description of descriptions) {
    description.classList.add('lesson__description--hidden')
  }
}


function switch_lesson_description () {
  let description = this.getElementsByClassName('lesson__description');

  if (description[0].classList.contains('lesson__description--hidden') === true) {
    hide_lessons_descriptions();
    description[0].classList.remove('lesson__description--hidden');
    insert_iframe_youtube(this);
  } else {
    hide_lessons_descriptions();
  }
  return false;
}


function disable_buttons(element) {
  let buttons = element.getElementsByClassName('buttons-month__item');
  for (let button of buttons) {
    button.classList.remove('buttons-month__item--active');
  }
}


function show_month_lesson(month, count_lessons_in_month=COUNT_LESSONS_IN_MONTH) {
  let lessons = document.getElementsByClassName('lessons__item');
  for (let lesson of lessons) {
    lesson.classList.add('lessons__item--hidden');
  }
  let end_lesson_in_month = count_lessons_in_month * month;
  let begin_lesson_in_month = end_lesson_in_month - count_lessons_in_month;

  if (lessons.length < begin_lesson_in_month) {
    return null;
  }
  if (lessons.length < end_lesson_in_month) {
    end_lesson_in_month = lessons.length;
  }
  for (let i = begin_lesson_in_month; i < end_lesson_in_month; i++) {
    lessons[i].classList.remove('lessons__item--hidden');
  }
}


function switch_month_lesson() {
  disable_buttons(this.parentNode);
  this.classList.add('buttons-month__item--active');

  for (let class_name of this.classList) {
    if (class_name.indexOf('month-') === 0) {
      // 'month-'.length === 6
      let month = parseInt(class_name.slice(6), 10)
      show_month_lesson(month)
    }
  }
}

export let set_handler_timetable = () => {
  // Навешиваем хендлеры на нажатие на заголовок урока
  let lesson_titles = document.getElementsByClassName('lesson-tittle__text');
  if (lesson_titles.length > 0) {
    for (let lesson_title of lesson_titles) {
      lesson_title.addEventListener('click', switch_lesson_description.bind(lesson_title.parentNode));
    }
  }

  // Навешиваем хендлеры на нажатие на кнопки выбора месяца
  let buttons_month = document.getElementsByClassName('buttons-month__item');
  if (buttons_month.length > 0) {
    for (let button_month of buttons_month) {
      button_month.addEventListener('click', switch_month_lesson.bind(button_month));
    }
  }
}
