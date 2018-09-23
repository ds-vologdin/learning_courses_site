const student_progress_reducer = (state=[], action) => {
  switch (action.type) {
    case 'SET_STUDENT_PROGRESS': return action.courses
    default: return state;
  }
};

export default student_progress_reducer;
