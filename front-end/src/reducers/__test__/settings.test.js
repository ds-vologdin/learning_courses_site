import settings_student_reducer from '../settings';


describe('settings_student_reducer', () => {
  it('SET_ACTIVE_BLOCK', () => {
      const action = {
        type: 'SET_ACTIVE_BLOCK',
        state: {
          active_block: 'learning',
        },
      };
      const result = settings_student_reducer({active_block: 'settings'}, action);
      expect(result.active_block).toBe('learning');
  });
});
