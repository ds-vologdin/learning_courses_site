const DEFAULT_STATE = {
  is_active_sign_form: false,
  is_register_content: true,
}

const sign_form_reducer = (state=DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'SHOW_SIGN_FORM': return toggle_sign_form(state, true)
        case 'HIDE_SIGN_FORM': return toggle_sign_form(state, false)
        case 'SHOW_REGISTER_CONTENT_IN_SIGN_FORM': return toggle_content_in_sign_form(state, 'register')
        case 'SHOW_LOGIN_CONTENT_IN_SIGN_FORM': return toggle_content_in_sign_form(state, 'login')
        default: return state;
    }
};

const toggle_sign_form = (state, value) => {
  let new_state = Object.assign({}, state);
  new_state.is_active_sign_form = value;
  return new_state
}

const toggle_content_in_sign_form = (state, content) => {
  let new_state = Object.assign({}, state);
  if (content === 'register') new_state.is_register_content = true;
  if (content === 'login') new_state.is_register_content = false;
  return new_state
}

export default sign_form_reducer;
