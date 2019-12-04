export const increment = number => {
  return {
    type: "INCREMENT",
    data: number
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT"
  };
};

export const listProducts = listProducts => {
  return {
    type: "LISTPRODUCTS",
    data: listProducts
  };
};

export const listCategories = listCategories => {
  return {
    type: "LISTCATEGORIES",
    data: listCategories
  };
};

export const addProductoToBuy = Product => {
  return {
    type: "ADDPRODUCTS",
    data: Product
  };
};

export const editQuantityInCart = (id, cantidad) => {
  return {
    type: "EDITQUANTITYINCART",
    data: id,
    cantidad: cantidad
  };
};

export const addToPayment = precio => {
  return {
    type: "ADDTOPAYMENT",
    data: precio
  };
};

export const removeInPayment = precio => {
  return {
    type: "REMOVEINPAYMENT",
    data: precio
  };
};
