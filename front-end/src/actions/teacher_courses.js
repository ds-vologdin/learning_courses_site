const MOCK_TEACHER_COURSES = [
  {
    name: 'Разработчик Python',
    date: '2018.09.13',
    id: '23',
    students: [
      {name: 'Student 1', id: '1'},
      {name: 'Student 2', id: '2'},
      {name: 'Student 3', id: '3'},
      {name: 'Student 4', id: '4'},
      {name: 'Student 5', id: '5'},
      {name: 'Student 6', id: '6'},
      {name: 'Student 7', id: '7'},
      {name: 'Student 8', id: '8'},
      {name: 'Student 9', id: '9'},
      {name: 'Student 10', id: '10'},
      {name: 'Student 11', id: '11'},
    ],
  },
  {
    name: 'Разработчик Python',
    date: '2018.04.13',
    id: '46',
    students: [
      {name: 'Student 1', id: '1'},
      {name: 'Student 2', id: '2'},
      {name: 'Student 3', id: '3'},
      {name: 'Student 4', id: '4'},
      {name: 'Student 5', id: '5'},
      {name: 'Student 6', id: '6'},
      {name: 'Student 7', id: '7'},
      {name: 'Student 8', id: '8'},
      {name: 'Student 9', id: '9'},
      {name: 'Student 10', id: '10'},
      {name: 'Student 11', id: '11'},
      {name: 'Student 11', id: '12'},
      {name: 'Student 11', id: '13'},
      {name: 'Student 11', id: '14'},
      {name: 'Student 11', id: '15'},
    ],
  },
];

// TODO: переписать заглушку на получение данных с REST API
const fetch_teacher_courses = (id_teacher) => MOCK_TEACHER_COURSES;

const fetch_teacher_courses_action = (id_teacher) => (
  {
    type: 'SET_TEACHER_COURSE',
    courses: fetch_teacher_courses(id_teacher),
  }
);

export default fetch_teacher_courses_action;
