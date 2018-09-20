import ic_teacher_0 from '../components/img/ic_teacher_0.jpg';
import ic_teacher_1 from '../components/img/ic_teacher_1.jpg';
import ic_teacher_2 from '../components/img/ic_teacher_2.jpg';
import ic_teacher_3 from '../components/img/ic_teacher_3.jpg';

const MOCK_TEACHERS = [
  {name:'Василий Уткин', course:'Разработчик Java', image:ic_teacher_0},
  {name:'Павел Воробьёв', course:'Machine Learning', image:ic_teacher_1},
  {name:'Иван Орлов', course:'Разработчик Python', image:ic_teacher_2},
  {name:'Роман Гусев', course:'Разработчик JS', image:ic_teacher_3},
];

// TODO: переписать заглушку на получение данных с REST API
const fetch_top_teachers = () => MOCK_TEACHERS;

const fetch_top_teachers_action = () => (
  {
    type: 'SET_TOP_TEACHERS',
    teachers: fetch_top_teachers(),
  }
);

export default fetch_top_teachers_action;
