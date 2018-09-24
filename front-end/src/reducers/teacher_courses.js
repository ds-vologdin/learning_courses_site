const teacher_courses_reducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_TEACHER_COURSE': return action.courses;
    default: return state;
  }
};

export default teacher_courses_reducer;
