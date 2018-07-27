export let fetch_courses = () => {
  fetch(
    'http://127.0.0.1:8000/courses/api/courses/'
  ).then(
    function(response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }
  ).then(function(curses_json) {
      console.log(curses_json);
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}
