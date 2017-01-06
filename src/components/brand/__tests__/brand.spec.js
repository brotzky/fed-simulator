import {
  React,
  expect,
  mount,
  ContextHolder,
  context,
  store,
  Provider,
} from "../../../helpers/test"
import Brand from "../brand"

describe("<Brand />", () => {
  const mainWrapper = mount(
    <Provider store={store}>
      <ContextHolder context={context}>
        <Brand />
      </ContextHolder>
    </Provider>
  )
  const wrapper = mainWrapper.find(Brand)
  it("contains an <Brand /> component", () => {
    expect(wrapper.find(Brand)).to.have.length(1)
  })
})
