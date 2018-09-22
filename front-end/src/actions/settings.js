export const SHOW_SETTINGS_BLOCK = {
  type: 'SET_ACTIVE_BLOCK',
  state: {active_block: 'settings'},
};

export const SHOW_LEARNING_BLOCK = {
  type: 'SET_ACTIVE_BLOCK',
  state: {active_block: 'learning'},
};

export const set_active_block_settings = (active_block) => ({
  type: 'SET_ACTIVE_BLOCK',
  state: {active_block: active_block},
});
