const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case "LISTCATEGORIES":
      if (action.data !== null) {
        const newState = action.data;
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default categoryReducer;
