import Backbone from "backbone"
import _each from "lodash/each"
import _escape from "lodash/escape"
import { hashCode } from "../helpers/hash"
import BrandModel from "./brand.model"

const Model = Backbone.Model.extend({
  defaults: {
    id: hashCode(new Date().toString()),
    name: "Default",
    male: true,
    brand: new BrandModel().toJSON(),
    canMoveBrands: true,
    tag: false,
    sequence: 0,
    changes: 0,
    wrestlers: [],
    centerStrapShape: "circle",
    centerPlateShape: "circle",
    centerPlateColor: "black",
    centerPlateBackgroundColor: "gold",
    sideplateBackgroundColor: "gold",
    strapBackgroundColor: "black",
    sideplateShape: "rectangle",
    centerPlateOverflow: false,
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
