const HOST = 'http://127.0.0.1:8000/';


const compare_date_begin = (a,b) => {
  if (a.date_begin < b.date_begin)
    return -1;
  if (a.date_begin > b.date_begin)
    return 1;
  return 0;
};


const create_elemet_course = (courses_block, course_description) => {
  let a_courses_item = document.createElement('a')
  a_courses_item.classList.add('courses__item');
  a_courses_item.href = '/courses/' + course_description.code_name

  let div_course = document.createElement('div');
  div_course.classList.add('course-item__block');
  div_course.classList.add('course');
  a_courses_item.appendChild(div_course);

  let div_course_tittle = document.createElement('div');
  div_course_tittle.classList.add('course__tittle');
  div_course_tittle.innerHTML = course_description.name;
  div_course.appendChild(div_course_tittle);

  let div_course_date = document.createElement('div');
  div_course_date.classList.add('course__date');
  div_course_date.innerHTML = 'С ' + course_description.date_begin + ' ' + course_description.duration_month + ' месяцев';
  div_course.appendChild(div_course_date);

  courses_block.appendChild(a_courses_item);
};


const create_elements_courses = courses_descriptions => {
  let courses_block = document.getElementsByClassName('courses-block__courses');
  if (courses_block.length !== 1) {
    console.log('Не нашли блок с курсами');
    return
  }
  courses_block = courses_block[0]
  courses_descriptions.sort(compare_date_begin).forEach(
    course_description => create_elemet_course(courses_block, course_description)
  )
};


const _fetch_json  = url => fetch(url).then(
  respone => {
    if (!respone.ok) {
      throw new Error('Network response was not ok.');
    }
    return respone.json();
  }
).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});


export const fetch_courses = () => Promise.all([
  _fetch_json(HOST + 'courses/api/courses/'),
  _fetch_json(HOST + 'courses/api/coursedescription/')
]).then(([courses, courses_descriptions]) => {
  // Сохраняем в courses_descriptions параметры следующего, ближайшего курса
  // TODO: это лучше реализовать на backend
  for (let description of courses_descriptions) {
    for (let course of courses) {
      if (description.pk === course.course_description_id) {
        description.date_begin = course.date_begin;
        description.duration_month = course.duration_month;
        break;
      }
    }
  }
  create_elements_courses(courses_descriptions)
}).catch(first_error => console.log(first_error));
