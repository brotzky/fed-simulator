import reducer from "../src/reducers/calendar"
import * as types from "../src/actions/types"
import Model from "../src/reducers/liveShow.model"

const defaultModel = new Model()
const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
const { isComplete, inProgress, } = false

const defaultState = {
  firstDay,
  lastDay,
  currentDay: firstDay,
  inProgress,
  isComplete,
  collection: [
    {
      name: "first",
      size: "xs",
      firstDay,
      lastDay,
    },
    {
      name: "first",
      size: "xs",
    },
  ],
}

const loadReducer = () => {
  const action = {
    payload: defaultState.collection,
    type: types.UPDATE_CALENDAR_LIVESHOWS,
  }
  return reducer(undefined, action)
}

const action = {
  type: "",
  payload: "",
}

describe("given a calendars reducer", () => {
  let calendarReducer

  before(() => (calendarReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(calendarReducer).to.be.empty
  })

  describe("and a collection is passed in", () => {
    let calendarReducer

    before(() => (calendarReducer = loadReducer()))

    it("should now have two in the collection", () => {
      expect(calendarReducer.collection.length).to.equal(2)
    })

    it("should have a first liveShow with an id", () => {
      expect(calendarReducer.collection[0].id).to.not.be.empty
    })

    it("should have a second liveShow with an id", () => {
      expect(calendarReducer.collection[1].id).to.not.be.empty
    })

    it("should have correct stats", () => {
      expect(calendarReducer.collection[0].gross).to.equal(
        defaultModel.toJSON().gross
      )
    })

    describe("and a live show is updated", () => {
      let calendarReducer

      before(() => (calendarReducer = loadReducer()))

      it("should expect the model to update", () => {
        let show = calendarReducer.collection[0]
        show = Object.assign(show, { name: "Test", size: "lg", })

        action.type = types.UPDATE_CALENDAR_LIVESHOW
        action.payload = {
          show,
          dateIndex: 0,
        }

        calendarReducer = reducer(calendarReducer, action)

        const matchingShow = calendarReducer.collection[0]

        expect(matchingShow.name).to.equal("Test")
        expect(matchingShow.size).to.equal("lg")
      })
    })

    describe("and a live show is deleted", () => {
      let calendarReducer

      before(() => (calendarReducer = loadReducer()))

      it("should expect the model to update", () => {
        let { date, } = calendarReducer.collection[0]
        action.type = types.DELETE_CALENDAR_LIVESHOW
        action.payload = date

        calendarReducer = reducer(calendarReducer, action)

        const liveShow = calendarReducer.collection.find(
          liveShow => liveShow.date === date
        )

        expect(liveShow.name).to.be.empty()
      })
    })

    describe("and a show generator is called", () => {
      let calendarReducer

      before(() => (calendarReducer = loadReducer()))

      it("should have different ids generated", () => {
        let { inProgress, } = calendarReducer.collection[0]
        action.type = types.GENERATE_CALENDAR_LIVESHOWS

        let newCalendarReducer = reducer(calendarReducer, action)

        expect(inProgress !== newCalendarReducer.inProgress)
      })
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        action.payload = false
        calendarReducer = reducer(undefined, action)
      })

      it("should have an empty collection", () => {
        expect(calendarReducer.collection.length).to.equal(0)
      })
    })
  })
})
