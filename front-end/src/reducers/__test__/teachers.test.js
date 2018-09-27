import top_teachers_reducer from '../teachers';


const MOCK_TEACHERS = [
  {name:'Василий Уткин', course:'Разработчик Java'},
  {name:'Павел Воробьёв', course:'Machine Learning'},
  {name:'Иван Орлов', course:'Разработчик Python'},
  {name:'Роман Гусев', course:'Разработчик JS'},
];

describe('top_teachers_reducer', () => {
  it('SET_TOP_TEACHERS', () => {
      const action = {
        type: 'SET_TOP_TEACHERS',
        teachers: MOCK_TEACHERS,
      };
      const result = top_teachers_reducer({}, action);
      expect(result[0].name).toBe('Василий Уткин');
      expect(result[0].course).toBe('Разработчик Java');
  });
});
