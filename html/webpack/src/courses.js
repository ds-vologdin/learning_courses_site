const HOST = 'http://127.0.0.1:8000/'


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
      for (let course of courses) {
        for (let description of courses_description) {
          if (description.pk === course.course_description_id) {
            course.description = description;
            break;
          }
        }
      }
      return courses
    }).then(function(courses) {
      console.log(courses);
      let courses_block = document.getElementsByClassName('courses-block__courses');
      if (courses_block.length !== 1) {
        console.log('Не нашли блок с курсами');
        return
      }
      courses_block = courses_block[0]
      for (let course of courses) {
        let a_courses_item = document.createElement('a')
        a_courses_item.classList.add('courses__item');
        a_courses_item.href = '/courses/' + course.description.code_name

        let div_course = document.createElement('div');
        div_course.classList.add('course-item__block');
        div_course.classList.add('course');
        a_courses_item.appendChild(div_course);

        let div_course_tittle = document.createElement('div');
        div_course_tittle.classList.add('course__tittle');
        div_course_tittle.innerHTML = course.description.name;
        div_course.appendChild(div_course_tittle);

        let div_course_date = document.createElement('div');
        div_course_date.classList.add('course__date');
        div_course_date.innerHTML = 'С ' + course.date_begin + ' ' + course.duration_month + ' месяцев';
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
