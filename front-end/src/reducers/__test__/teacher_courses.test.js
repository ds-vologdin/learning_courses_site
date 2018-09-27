import teacher_courses_reducer from '../teacher_courses';


const MOCK_TEACHER_COURSES = [
  {
    name: 'Разработчик Python',
    date: '2018.09.13',
    id: '23',
    students: [
      {name: 'Student 1', id: '1'},
      {name: 'Student 2', id: '2'},
    ],
  },
];


describe('teacher_courses_reducer', () => {
  it('SET_TEACHER_COURSE', () => {
      const action = {
        type: 'SET_TEACHER_COURSE',
        courses: MOCK_TEACHER_COURSES,
      };
      const result = teacher_courses_reducer([], action);
      expect(result[0].name).toBe('Разработчик Python');
      expect(result[0].id).toBe('23');
      expect(result[0].students[0].name).toBe('Student 1');
      expect(result[0].students[0].id).toBe('1');
  });
});
