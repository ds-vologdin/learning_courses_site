const DEFAULT_STATE_SESSION = {
  username: '',
  token: '',
  is_authorized: false,
};

const session_reducer = (state=DEFAULT_STATE_SESSION, action) => {
    switch (action.type) {
        case 'SET_SESSION': return action.session
        default: return state;
    }
};

export default session_reducer;
