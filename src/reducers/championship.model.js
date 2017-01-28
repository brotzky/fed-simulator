import Backbone from "backbone"
import { hashCode } from "../helpers/hash"
const Model = Backbone.Model.extend({
  defaults: {
    id: hashCode(new Date().toString()),
    name: "",
    male: true,
    brand: "Default",
    canMoveBrands: true,
    tag: false,
    sequence: 0,
    changes: 0,
    wrestlers: [],
    centerStrapShape: "circle",
    centerPlateShape: "circle",
    centerPlateColor: "black",
    sideplateBackgroundColor: "gold",
    strapBackgroundColor: "black",
    sideplateShape: "rectangle",
    centerPlateOverflow: false,
  },
})

export default Model
