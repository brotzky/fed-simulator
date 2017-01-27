import Backbone from "backbone"
import { hashCode } from "../helpers/hash"
const Model = Backbone.Model.extend({
  defaults: {
    id: hashCode(new Date().toString()),
    name: "Default",
    male: true,
    canMoveBrands: true,
    tag: false,
    sequence: 0,
    changes: 0,
    wrestlers: [],
    centerStrapShape: "circle",
    centerPlateShape: "square",
    centerPlateColor: "gold",
    sideplateBackgroundColor: "gold",
    strapBackgroundColor: "black",
    sideplateShape: "rectangle",
    centerPlateOverflow: true,
  },
})

export default Model
