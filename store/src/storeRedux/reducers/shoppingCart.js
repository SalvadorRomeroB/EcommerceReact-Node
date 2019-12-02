const shoppingCartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADDPRODUCTS":
      if (state.length !== 0) {
        let found = false;
        let pos = 0;
        for (let i = 0; i < state.length; i++) {
          if (action.data._id === state[i].producto._id) {
            found = true;
            pos = i;
          }
        }
        if (found) {
          state[pos].cantidad++;
        } else {
          state.push({ producto: action.data, cantidad: 1 });
        }
      } else {
        state.push({ producto: action.data, cantidad: 1 });
      }
      return state;
    case "EDITQUANTITYINCART":
      for (let i = 0; i < state.length; i++) {
        if (action.data === state[i].producto._id) {
          state[i].cantidad += action.cantidad;
        }
      }
      return state;
    default:
      return state;
  }
};

export default shoppingCartReducer;