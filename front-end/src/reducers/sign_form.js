const sign_form_reducer = (state = {is_active_sign_form: false}, action) => {
    switch (action.type) {
        case 'SHOW_SIGN_FORM': return {is_active_sign_form: true}
        case 'HIDE_SIGN_FORM': return {is_active_sign_form: false}
        default: return state;
    }
};

export default sign_form_reducer;
