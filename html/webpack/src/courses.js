const HOST = 'http://127.0.0.1:8000/'


let get_courses = (curses_descriptions) => {
  console.log(curses_descriptions.course);
  let courses = curses_descriptions.course;
  console.log(courses.length);
  for (let i; i < courses.length; i++) {
    console.log(courses[i]);
    console.log(i);
  }
}


export let fetch_courses = () => {
    fetch(HOST + 'courses/api/courses/').then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  }).then(function(courses) {
      fetch(HOST + 'courses/api/coursedescription/').then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json()
      }).then(function(courses_description) {
        console.log(courses);
        console.log(courses_description);
      })
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}
