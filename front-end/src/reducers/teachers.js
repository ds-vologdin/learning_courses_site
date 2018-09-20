const top_teachers_reducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOP_TEACHERS': return action.teachers
        default: return state;
    }
};

export default top_teachers_reducer;
