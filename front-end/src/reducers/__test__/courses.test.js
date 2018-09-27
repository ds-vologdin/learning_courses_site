import next_courses_reducer from '../courses';


describe('next_courses_reducer', () => {
  it('SET_NEXT_COURSES', () => {
      const action = {
        type: 'SET_NEXT_COURSES',
        courses: [
          {title: 'Разработчик Python', date: '2018.09.13', duration: '6'},
        ],
      };
      const result = next_courses_reducer([], action);
      expect(result[0].title).toBe('Разработчик Python');
      expect(result[0].date).toBe('2018.09.13');
      expect(result[0].duration).toBe('6');
  });
});
