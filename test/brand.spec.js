import {
  React,
  expect,
  mount,
  ContextHolder,
  context,
  store,
  Provider
} from "./test"
import Brand from "../src/components/brand/brand"

const model = {
  id: 1,
  name: "test",
  "bgColour": "black",
  "textColour": "white",
}

describe("<Brand />", () => {
  const mainWrapper = mount(
    <Provider store={store}>
      <ContextHolder context={context}>
        <Brand model={model} />
      </ContextHolder>
    </Provider>
  )
  const wrapper = mainWrapper.find(Brand)
  it("contains an <Brand /> component", () => {
    expect(wrapper.find(Brand)).to.have.length(1)
  })
})
