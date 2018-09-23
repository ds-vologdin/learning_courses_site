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
  {
    name:'Разработчик Java',
    date:'2018.04.13',
    tasks: [
      {name: 'task 1', description: 'task 1 description', status: 'OK'},
      {name: 'task 2', description: 'task 2 description', status: 'OK'},
      {name: 'task 3', description: 'task 3 description', status: 'OK'},
    ]
  },
];

// TODO: переписать заглушку на получение данных с REST API
const fetch_student_progress = () => MOCK_STUDENT_PROGRESS;

const fetch_student_progress_action = () => (
  {
    type: 'SET_STUDENT_PROGRESS',
    courses: fetch_student_progress(),
  }
);

export default fetch_student_progress_action;
