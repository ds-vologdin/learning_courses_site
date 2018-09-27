import student_progress_reducer from '../student_progress';


const MOCK_STUDENT_PROGRESS = [
  {
    name:'Разработчик Python',
    date:'2018.09.13',
    tasks: [
      {name: 'task 1', description: 'task 1 description', status: 'OK'},
      {name: 'task 2', description: 'task 2 description', status: 'OK'},
      {name: 'task 3', description: 'task 3 description', status: 'OK'},
    ]
  },
];


describe('student_progress_reducer', () => {
  it('SET_STUDENT_PROGRESS', () => {
      const action = {
        type: 'SET_STUDENT_PROGRESS',
        courses: MOCK_STUDENT_PROGRESS,
      };
      const result = student_progress_reducer([], action);
      const tasks_0 = result[0].tasks[0];
      expect(result[0].name).toBe('Разработчик Python');
      expect(result[0].date).toBe('2018.09.13');
      expect(tasks_0.name).toBe('task 1');
      expect(tasks_0.description).toBe('task 1 description');
      expect(tasks_0.status).toBe('OK');
  });
});
