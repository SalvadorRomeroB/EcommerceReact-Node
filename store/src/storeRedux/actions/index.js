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
