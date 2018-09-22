import next_courses_reducer from './courses';
import top_teachers_reducer from './teachers';
import sign_form_reducer from './sign_form';
import session_reducer from './session';
import settings_reducer from './settings';


const app_reducer = (state = {}, action) => {
  return {
    next_courses: next_courses_reducer(state.next_courses, action),
    top_teachers: top_teachers_reducer(state.top_teachers, action),
    sign_form: sign_form_reducer(state.sign_form, action),
    session: session_reducer(state.session, action),
    settings: settings_reducer(state.settings, action),
  };
};

export default app_reducer;
