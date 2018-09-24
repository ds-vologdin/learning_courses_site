const MOCK_TASKS = {
  student: 'Student 1',
  course: 'Course 1',
  tasks: [
    {name: 'task 1', description: 'task 1 description', status: 'OK'},
    {name: 'task 2', description: 'task 2 description', status: 'FAIL'},
    {name: 'task 3', description: 'task 3 description', status: 'OK'},
    {name: 'task 4', description: 'task 4 description', status: 'NONE'},
    {name: 'task 5', description: 'task 5 description', status: 'OK'},
    {name: 'task 6', description: 'task 6 description', status: 'OK'},
    {name: 'task 7', description: 'task 7 description', status: 'OK'},
  ]
};

// TODO: переписать заглушку на получение данных с REST API
const fetch_user_courses_task = (id_course, id_student) => MOCK_TASKS;

const fetch_user_courses_task_action = (id_course, id_student) => (
  {
    type: 'SET_USER_COURSE_TASKS',
    state: fetch_user_courses_task(id_course, id_student),
  }
);

export default fetch_user_courses_task_action;
