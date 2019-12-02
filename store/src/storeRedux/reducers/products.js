const productsReducer = (state = [], action) => {
  switch (action.type) {
    case "LISTPRODUCTS":
      if (action.data !== null) {
        const newState = action.data;
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default productsReducer;
