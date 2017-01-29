import Backbone from "backbone"

const Model = Backbone.Model.extend({
  defaults: {
    id: "1",
    name: "Live!",
    defaultBrand: "",
    sequence: 0,
    attendance: {
      min: 1000,
      max: 15000,
    },
  },
})

export default Model
