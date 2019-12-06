import productsReducer from "../storeRedux/reducers/products";
import categoryReducer from "../storeRedux/reducers/categories";
import totalPaymentReducer from "../storeRedux/reducers/totalPayment";
import shoppingCartReducer from "../storeRedux/reducers/shoppingCart";

describe("Test Reducers in store", () => {
  test("Pass new array with product and return new State", () => {
    expect(
      productsReducer([], {
        type: "LISTPRODUCTS",
        data: [{ name: "new products" }]
      })
    ).toEqual([{ name: "new products" }]);
  });

  test("Pass new array with categories and return new State", () => {
    expect(
      categoryReducer([], {
        type: "LISTCATEGORIES",
        data: [{ name: "new category" }]
      })
    ).toEqual([{ name: "new category" }]);
  });

  test("Add payment to the total", () => {
    expect(
      totalPaymentReducer(10, {
        type: "ADDTOPAYMENT",
        data: 10
      })
    ).toEqual(20);
  });

  test("Remove payment in total", () => {
    expect(
      totalPaymentReducer(100, {
        type: "REMOVEINPAYMENT",
        data: 50
      })
    ).toEqual(50);
  });

  test("Payment = 0", () => {
    expect(
      totalPaymentReducer(100, {
        type: "DELETETOTAL"
      })
    ).toEqual(0);
  });

  test("Add product to the shopping cart when is empty", () => {
    expect(
      shoppingCartReducer([], {
        type: "ADDPRODUCTS",
        data: {
          _id: "1",
          name: "Yoda"
        }
      })
    ).toEqual([
      {
        cantidad: 1,
        producto: { _id: "1", name: "Yoda" }
      }
    ]);
  });

  test("Add repited product to the shopping cart", () => {
    expect(
      shoppingCartReducer(
        [
          {
            cantidad: 1,
            producto: { _id: "1", name: "Yoda" }
          }
        ],
        {
          type: "ADDPRODUCTS",
          data: {
            _id: "1",
            name: "Yoda"
          }
        }
      )
    ).toEqual([
      {
        cantidad: 2,
        producto: { _id: "1", name: "Yoda" }
      }
    ]);
  });

  test("Add different product to the shopping cart", () => {
    expect(
      shoppingCartReducer(
        [
          {
            cantidad: 1,
            producto: { _id: "1", name: "Yoda" }
          }
        ],
        {
          type: "ADDPRODUCTS",
          data: {
            _id: "2",
            name: "Baby Yoda"
          }
        }
      )
    ).toEqual([
      {
        cantidad: 1,
        producto: { _id: "1", name: "Yoda" }
      },
      {
        cantidad: 1,
        producto: {
          _id: "2",
          name: "Baby Yoda"
        }
      }
    ]);
  });

  test("Edit quantity to buy in cart", () => {
    expect(
      shoppingCartReducer(
        [
          {
            cantidad: 1,
            producto: { _id: "1", name: "Yoda" }
          }
        ],
        {
          type: "EDITQUANTITYINCART",
          data: "1",
          cantidad: 1
        }
      )
    ).toEqual([
      {
        cantidad: 2,
        producto: { _id: "1", name: "Yoda" }
      }
    ]);
    expect(
      shoppingCartReducer(
        [
          {
            cantidad: 3,
            producto: { _id: "1", name: "Yoda" }
          }
        ],
        {
          type: "EDITQUANTITYINCART",
          data: "1",
          cantidad: -1
        }
      )
    ).toEqual([
      {
        cantidad: 2,
        producto: { _id: "1", name: "Yoda" }
      }
    ]);
  });

  test("Delete item in shopping cart", () => {
    expect(
      shoppingCartReducer(
        [
          {
            cantidad: 1,
            producto: { _id: "1", name: "Yoda" }
          },
          {
            cantidad: 1,
            producto: { _id: "2", name: "Baby Yoda" }
          }
        ],
        {
          type: "DELETEITEM",
          data: "1"
        }
      )
    ).toEqual([
      {
        cantidad: 1,
        producto: { _id: "2", name: "Baby Yoda" }
      }
    ]);
  });

  test("Delete shopping cart", () => {
    expect(
      shoppingCartReducer(
        [
          {
            cantidad: 1,
            producto: { _id: "1", name: "Yoda" }
          },
          {
            cantidad: 1,
            producto: { _id: "2", name: "Baby Yoda" }
          }
        ],
        {
          type: "DELETESHOPPINGCART"
        }
      )
    ).toEqual([]);
  });
});
