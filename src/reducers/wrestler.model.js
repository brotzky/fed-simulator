import Backbone from "backbone"

const Model = Backbone.Model.extend({
  defaults: {
    id: "1",
    name: "Default",
    male: true,
    rating: 80,
    damage: 80,
  },
})

export default Model
