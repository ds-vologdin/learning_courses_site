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
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}
