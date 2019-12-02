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
