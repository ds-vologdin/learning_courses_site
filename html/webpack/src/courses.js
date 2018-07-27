const HOST = 'http://127.0.0.1:8000/'

export let fetch_courses = () => {
  Promise.all([
    fetch(HOST + 'courses/api/coursedescription/'),
    fetch(HOST + 'courses/api/courses/'),
  ]).then(allResponses => {
    const response_course_description = allResponses[0]
    const response_course = allResponses[1]
    if (!response_course_description.ok || !response_course.ok) {
      throw new Error('Network response was not ok.');
    }
    let course_description = response_course_description.json()
    let course = response_course.json()
    return {
      'course_description': course_description,
      'course': course
    }
  }).then(function(curses) {
      console.log(curses);
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}
