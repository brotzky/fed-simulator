import reducer, { NOTIFICATION_TYPES } from "../src/reducers/notifications"
import * as types from "../src/actions/types"
import { schema } from "../src/models/notification.model"

const defaultAction = {
  type: types.RESET,
  payload: false,
}
let action = Object.assign({}, defaultAction)
const defaultPayload1 = {
  type: Object.keys(NOTIFICATION_TYPES)[0],
}
const defaultPayload2 = {
  type: Object.keys(NOTIFICATION_TYPES)[1],
}

describe("given a notification reducer", () => {
  let activeReducer

  before(() => (activeReducer = reducer(undefined, defaultAction)))

  it("should be empty", () => {
    expect(activeReducer).to.have.length(0)
  })

  describe("and a notification is triggered", () => {
    before(() => activeReducer = reducer(activeReducer, defaultPayload1))

    it("should have 1 notification", () => {
      expect(activeReducer).to.have.length(1)
    })

    describe("and a notification is triggered", () => {
      before(() => activeReducer = reducer(activeReducer, defaultPayload2))

      it("should have 2 notifications", () => {
        expect(activeReducer).to.have.length(2)
      })

      it("should have a correct values for the first item", () => {
        const { type, title, } = activeReducer[0]

        expect(title).to.equal(NOTIFICATION_TYPES[defaultPayload1.type])
      })

      it("should have a correct values for the second item", () => {
        const { type, title, } = activeReducer[1]

        expect(title).to.equal(NOTIFICATION_TYPES[defaultPayload2.type])
      })

      describe("and a request to remove it is triggered", () => {
        before(() => {
          action.type = types.DELETE_NOTIFICATION
          action.payload = { id : activeReducer[0].id }

          activeReducer = reducer(activeReducer, action)
        })

        it("should have 1 notification", () => {
          expect(activeReducer).to.have.length(1)
        })
      })
      describe("and reset is triggered", () => {
        before(() => activeReducer = reducer(activeReducer, defaultAction))

        it("should be empty", () => {
          expect(activeReducer).to.have.length(0)
        })
      })
    })
  })
})
