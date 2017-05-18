import reducer from "../src/reducers/calendar"
import * as types from "../src/actions/types"
import Model from "../src/reducers/liveShow.model"

const defaultModel = new Model()
const defaultMonth = 7
const defaultYear = 2017
const firstDay = new Date(defaultYear, defaultMonth, 1).toDateString()
const lastDay = new Date(defaultYear, defaultMonth + 1, 0).toDateString()
const { isComplete, inProgress, } = false

const defaultState = [
  {
    name: "first",
    size: "xs",
    date: firstDay,
  },
  {
    name: "first",
    size: "xs",
    date: lastDay,
  },
]

const loadReducer = () => {
  const action = {
    payload: defaultState,
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

  describe("and two days is passed in", () => {
    let calendarReducer

    before(() => (calendarReducer = loadReducer()))

    it("should now have two days", () => {
      expect(calendarReducer.length).to.equal(2)
    })

    it("should have a first liveShow with an id", () => {
      expect(calendarReducer[0].id).to.not.be.empty
    })

    it("should have a second liveShow with an id", () => {
      expect(calendarReducer[1].id).to.not.be.empty
    })

    it("should have correct stats", () => {
      expect(calendarReducer[0].gross).to.equal(defaultModel.toJSON().gross)
    })

    describe("and a live show is updated", () => {
      let calendarReducer

      before(() => (calendarReducer = loadReducer()))

      it("should expect the model to update", () => {
        let show = calendarReducer[0]
        show = Object.assign(show, { name: "Test", size: "lg", })

        action.type = types.UPDATE_CALENDAR_LIVESHOW
        action.payload = {
          show,
          dateIndex: 0,
        }

        calendarReducer = reducer(calendarReducer, action)

        const matchingShow = calendarReducer[0]

        expect(matchingShow.name).to.equal("Test")
        expect(matchingShow.size).to.equal("lg")
      })
    })

    describe("and a live show is deleted", () => {
      let calendarReducer

      before(() => (calendarReducer = loadReducer()))

      it("should expect the model to update", () => {
        let { date, } = calendarReducer[0]
        action.type = types.DELETE_CALENDAR_LIVESHOW
        action.payload = date

        calendarReducer = reducer(calendarReducer, action)

        const singleShow = calendarReducer.find(
          liveShow => liveShow.date === date
        )

        expect(singleShow.name).to.be.empty()
      })
    })

    describe("and a show generator is called", () => {
      before(() => {
        action.type = types.GENERATE_CALENDAR_LIVESHOWS
        action.payload = { month: defaultMonth, year: defaultYear, }

        calendarReducer = reducer(calendarReducer, action)
      })

      it("should generate a valid first date", () => {
        expect(calendarReducer[0].date).to.equal("2017-07-31T23:00:00.000Z")
      })

      it("should generate a valid last date", () => {
        expect(calendarReducer[30].date).to.equal("2017-08-30T23:00:00.000Z")
      })

      it("should generate 31 dates", () => {
        expect(calendarReducer).to.have.length(31)
      })
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        action.payload = false
        calendarReducer = reducer(undefined, action)
      })

      it("should be collection", () => {
        expect(calendarReducer.length).to.equal(0)
      })
    })
  })
})
