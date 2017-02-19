import Backbone from "backbone"
import _each from "lodash/each"
import _escape from "lodash/escape"
import BrandModel from "./brand.model"
import PPVModel from "./ppv.model"

const Model = Backbone.Model.extend({
  defaults: {
    id: Math.random().toString(36),
    brand: new BrandModel().toJSON(),
    PPV: new PPVModel().toJSON(),
    matches: Array.from({
      length: 12,
    }).fill({
      isTagMatch: false,
    }),
    attendance: 1000,
  },

  initialize() {
    _each(this.attributes, (val, key) => this.set(key, this.sanitize(val)))
  },

  sanitize(str) {
    if (typeof(str) === "string") {
      str = _escape(str)
    }
    return str
  },

})

export default Model
