import { listProducts } from "../storeRedux/actions/index";

describe("Test Actions in store", () => {
  it("should create an action to add a todo", () => {
    const List = ["Finish doc"];
    const expectedAction = {
      type: "LISTPRODUCTS",
      data: List
    };
    expect(listProducts(List)).toEqual(expectedAction);
  });
});
