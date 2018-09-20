import TOKEN from '../components/token_private';


const MOCK_STATE_SESSION = {
  username: 'Dima',
  token: TOKEN,
  is_authorized: true,
};

// TODO: переписать заглушку на получение данных с REST API
const login_action = (login, password) => ({
  type: 'SET_SESSION',
  session: MOCK_STATE_SESSION,
});

export default login_action;
