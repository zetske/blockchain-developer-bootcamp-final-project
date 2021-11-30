export const applyMiddleware = (dispatch: any) => (action: any) => {
  switch (action.type) {
    default:
      dispatch(action);
  }
};