const next_courses_reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NEXT_COURSES': return action.courses
        default: return state;
    }
};

export default next_courses_reducer;
