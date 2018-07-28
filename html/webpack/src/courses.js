const HOST = 'http://127.0.0.1:8000/'


function compare_date_begin(a,b) {
  if (a.date_begin < b.date_begin)
    return -1;
  if (a.date_begin > b.date_begin)
    return 1;
  return 0;
}



export let fetch_courses = () => {
    fetch(HOST + 'courses/api/courses/').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  }).then(function(courses) {
    fetch(HOST + 'courses/api/coursedescription/').then(response => {
      return response.json();
    }).then(function(courses_description) {
      for (let description of courses_description) {
        for (let course of courses) {
          if (description.pk === course.course_description_id) {
            description.date_begin = course.date_begin;
            description.duration_month = course.duration_month;
            break;
          }
        }
      }
      return courses_description;
    }).then(function(courses_description) {
      console.log(courses);
      let courses_block = document.getElementsByClassName('courses-block__courses');
      if (courses_block.length !== 1) {
        console.log('Не нашли блок с курсами');
        return
      }
      courses_block = courses_block[0]
      for (let course_description of courses_description.sort(compare_date_begin)) {
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
      }
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}
