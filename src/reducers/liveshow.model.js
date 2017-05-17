import Backbone from "backbone"
import _each from "lodash/each"
import sanitizer from "sanitizer"

const Model = Backbone.Model.extend({
  defaults: {
    canPlan: false,
    cost: 0,
    date: Date(),
    gross: 0,
    matches: [],
    name: "",
    rating: 0,
    showId: false,
    size: "xs",
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
