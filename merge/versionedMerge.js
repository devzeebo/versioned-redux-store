export const normalMerge = (init, pers) => (pers ? { ...init, ...pers } : init);
export const mergeByVersion = (initial, persisted) => {
  const shouldUseInitialState = initial.version !== persisted.version;
  if (shouldUseInitialState) {
    return initial; // If going backwards, use initial. If initial is more recent use initial.
  }
  return normalMerge(initial, persisted);
};

export const versionedMerge = (initialState, persistedState) => {
  if (!persistedState) return initialState;
  if (initialState.version && persistedState.version) {
    return mergeByVersion(initialState, persistedState);
  } else if (initialState.version && !persistedState.version) {
    return initialState; // that is override persisted state with versioned content.
  }
  // persisted has version but not initial? How did you get here...
  return normalMerge(initialState, persistedState);
};

export default versionedMerge;
