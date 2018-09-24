const DEFAULT_USER_COURSE = {
  student: '',
  course: '',
  tasks: [],
}

const user_course_tasks_reducer = (state = DEFAULT_USER_COURSE, action) => {
    switch (action.type) {
        case 'SET_USER_COURSE_TASKS': return action.state;
        default: return state;
    }
};

export default user_course_tasks_reducer;
