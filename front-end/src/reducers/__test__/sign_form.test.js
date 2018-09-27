import sign_form_reducer from '../sign_form';


describe('sign_form_reducer', () => {
  it('SHOW_SIGN_FORM state is_active_sign_form = false', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: false,
      is_register_content: true,
    }
    const action = {type: 'SHOW_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_active_sign_form).toBe(true);
  });
  it('SHOW_SIGN_FORM state is_active_sign_form = true', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: true,
      is_register_content: true,
    }
    const action = {type: 'SHOW_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_active_sign_form).toBe(true);
  });
  it('HIDE_SIGN_FORM state is_active_sign_form = true', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: true,
      is_register_content: true,
    }
    const action = {type: 'HIDE_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_active_sign_form).toBe(false);
  });
  it('HIDE_SIGN_FORM state is_active_sign_form = false', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: false,
      is_register_content: true,
    }
    const action = {type: 'HIDE_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_active_sign_form).toBe(false);
  });
  it('SHOW_REGISTER_CONTENT_IN_SIGN_FORM state is_register_content = false', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: false,
      is_register_content: false,
    }
    const action = {type: 'SHOW_REGISTER_CONTENT_IN_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_register_content).toBe(true);
  });
  it('SHOW_REGISTER_CONTENT_IN_SIGN_FORM state is_register_content = true', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: false,
      is_register_content: true,
    }
    const action = {type: 'SHOW_REGISTER_CONTENT_IN_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_register_content).toBe(true);
  });
  it('SHOW_LOGIN_CONTENT_IN_SIGN_FORM state is_register_content = false', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: false,
      is_register_content: false,
    }
    const action = {type: 'SHOW_LOGIN_CONTENT_IN_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_register_content).toBe(false);
  });
  it('SHOW_LOGIN_CONTENT_IN_SIGN_FORM state is_register_content = true', () => {
    const DEFAULT_STATE = {
      is_active_sign_form: false,
      is_register_content: true,
    }
    const action = {type: 'SHOW_LOGIN_CONTENT_IN_SIGN_FORM'};
    const result = sign_form_reducer(DEFAULT_STATE, action);
    expect(result.is_register_content).toBe(false);
  });
});
