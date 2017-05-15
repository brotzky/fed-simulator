import Backbone from "backbone"
import _each from "lodash/each"
import sanitizer from "sanitizer"

const Model = Backbone.Model.extend({
  defaults: {
    name: "",
    isCompleted: false,
    cost: 0,
    gross: 0,
    rating: 0,
    date: Date(),
    matches: [],
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
