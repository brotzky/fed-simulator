import Backbone from "backbone"

const Model = Backbone.Model.extend({
  defaults: {
    id: "1",
    name: "Default",
    image: "",
    male: true,
    default: true,
    bgColour: "#000",
    textColour: "#fff",
    sequence: 0,
  },
})

export default Model
