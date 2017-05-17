import Backbone from "backbone"
import _each from "lodash/each"
import sanitizer from "sanitizer"

const Model = Backbone.Model.extend({
  defaults: {
    currentDate: new Date().getUTCDate(),
    currentMonth: new Date().getUTCMonth(),
    currentYear: new Date().getFullYear(),
    canPlan: true,
    cash: 0,
  },

  initialize() {
    _each(this.attributes, (val, key) => this.set(key, this.sanitize(val)))
  },

  sanitize(str) {
    if (typeof str === "string") {
      str = sanitizer.escape(str)
    }
    return str
  },
})

export default Model
