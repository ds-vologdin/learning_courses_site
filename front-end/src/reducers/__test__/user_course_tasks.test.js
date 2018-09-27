import user_course_tasks_reducer from '../user_course_tasks';


const MOCK_TASKS = {
  student: 'Student 1',
  course: 'Course 1',
  tasks: [
    {name: 'task 1', description: 'task 1 description', status: 'OK'},
    {name: 'task 2', description: 'task 2 description', status: 'FAIL'},
    {name: 'task 3', description: 'task 3 description', status: 'OK'},
    {name: 'task 4', description: 'task 4 description', status: 'NONE'},
  ]
};


describe('user_course_tasks_reducer', () => {
  it('SET_USER_COURSE_TASKS', () => {
      const action = {
        type: 'SET_USER_COURSE_TASKS',
        state: MOCK_TASKS,
      };
      const result = user_course_tasks_reducer({}, action);
      expect(result.student).toBe('Student 1');
      expect(result.course).toBe('Course 1');
      expect(result.tasks[0].name).toBe('task 1');
      expect(result.tasks[0].description).toBe('task 1 description');
      expect(result.tasks[0].status).toBe('OK');
  });
});
