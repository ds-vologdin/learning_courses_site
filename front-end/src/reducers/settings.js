const DEFAULT_STATE_SETTINGS = {
  // active_block: 'settings',
  active_block: 'learning',
};

const settings_student_reducer = (state=DEFAULT_STATE_SETTINGS, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_BLOCK': return action.state
    default: return state;
  }
};

export default settings_student_reducer;
