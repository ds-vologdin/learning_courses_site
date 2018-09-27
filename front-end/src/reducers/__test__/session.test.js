import session_reducer from '../session';


describe('session_reducer', () => {
  it('SET_SESSION', () => {
      const action = {
        type: 'SET_SESSION',
        session: {
          username: 'John',
          token: 'private_token',
          is_authorized: true,
          id: '213',
        },
      };
      const result = session_reducer({}, action);
      expect(result.username).toBe('John');
      expect(result.token).toBe('private_token');
      expect(result.is_authorized).toBe(true);
      expect(result.id).toBe('213');
  });
});
