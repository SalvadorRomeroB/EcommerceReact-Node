import {
  listProducts,
  listCategories,
  addProductoToBuy,
  editQuantityInCart,
  addToPayment,
  deleteItem,
  removeInPayment,
  deleteTotal,
  deleteShoppingCart
} from "../storeRedux/actions/index";

describe("Test Actions in store", () => {
  test("create LISTPRODUCTS action correct", () => {
    const data = {
      _id: "1",
      name: "Yoda"
    };
    const expectedAction = {
      type: "LISTPRODUCTS",
      data: data
    };
    expect(listProducts(data)).toEqual(expectedAction);
  });

  test("create LISTCATEGORIES action correct", () => {
    const data = {
      _id: "1",
      name: "Yoda"
    };
    const expectedAction = {
      type: "LISTCATEGORIES",
      data: data
    };
    expect(listCategories(data)).toEqual(expectedAction);
  });

  test("create ADDPRODUCTS action correct", () => {
    const data = {
      _id: "1",
      name: "Yoda"
    };
    const expectedAction = {
      type: "ADDPRODUCTS",
      data: data
    };
    expect(addProductoToBuy(data)).toEqual(expectedAction);
  });

  test("create EDITQUANTITYINCART action correct", () => {
    const id = "1";
    const cantidad = 1;
    const expectedAction = {
      type: "EDITQUANTITYINCART",
      data: id,
      cantidad: cantidad
    };
    expect(editQuantityInCart(id, cantidad)).toEqual(expectedAction);
  });

  test("create ADDTOPAYMENT action correct", () => {
    const precio = 100;
    const expectedAction = {
      type: "ADDTOPAYMENT",
      data: precio
    };
    expect(addToPayment(precio)).toEqual(expectedAction);
  });

  test("create DELETEITEM action correct", () => {
    const id = "1";
    const expectedAction = {
      type: "DELETEITEM",
      data: id
    };
    expect(deleteItem(id)).toEqual(expectedAction);
  });

  test("create REMOVEINPAYMENT action correct", () => {
    const precio = 100;
    const expectedAction = {
      type: "REMOVEINPAYMENT",
      data: precio
    };
    expect(removeInPayment(precio)).toEqual(expectedAction);
  });

  test("create DELETETOTAL action correct", () => {
    const expectedAction = {
      type: "DELETETOTAL"
    };
    expect(deleteTotal()).toEqual(expectedAction);
  });

  test("create DELETESHOPPINGCART action correct", () => {
    const expectedAction = {
      type: "DELETESHOPPINGCART"
    };
    expect(deleteShoppingCart()).toEqual(expectedAction);
  });
});
