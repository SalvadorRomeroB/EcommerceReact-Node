import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    addTodo: jest.fn()
  };

  const enzymeWrapper = shallow(<App {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("Test Components", () => {
  test("should render self and subcomponents", () => {
    const { enzymeWrapper } = setup();

    console.log(enzymeWrapper.html());

    // expect(enzymeWrapper.find("header").hasClass("header")).toBe(true);

    // expect(enzymeWrapper.find("h1").text()).toBe("todos");

    // const todoInputProps = enzymeWrapper.find("TodoTextInput").props();
    // expect(todoInputProps.newTodo).toBe(true);
    // expect(todoInputProps.placeholder).toEqual("What needs to be done?");
  });
});
