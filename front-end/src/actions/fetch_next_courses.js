const MOCK_COURSES = [
  {title:'Разработчик Python', date:'2018.09.13', duration:'6'},
  {title:'Разработчик Java', date:'2018.10.13', duration:'6'},
  {title:'WEB Python', date:'2018.10.21', duration:'6'},
  {title:'Machine Learning', date:'2018.10.29', duration:'7'},
];

// TODO: переписать заглушку на получение данных с REST API
const fetch_next_courses = () => MOCK_COURSES;

const fetch_next_courses_action = () => (
  {
    type: 'SET_NEXT_COURSES',
    courses: fetch_next_courses(),
  }
);

export default fetch_next_courses_action;
