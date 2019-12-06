import productsReducer from "../storeRedux/reducers/products";
import categoryReducer from "../storeRedux/reducers/categories";

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

  test("Pass new array with categories and return new State", () => {
    expect(
      categoryReducer([], {
        type: "LISTCATEGORIES",
        data: [{ name: "new category" }]
      })
    ).toEqual([{ name: "new category" }]);
  });

  //     expect(
  //       reducer(
  //         [
  //           {
  //             text: "Use Redux",
  //             completed: false,
  //             id: 0
  //           }
  //         ],
  //         {
  //           type: types.ADD_TODO,
  //           text: "Run the tests"
  //         }
  //       )
  //     ).toEqual([
  //       {
  //         text: "Run the tests",
  //         completed: false,
  //         id: 1
  //       },
  //       {
  //         text: "Use Redux",
  //         completed: false,
  //         id: 0
  //       }
  //     ]);

  //   });
});
