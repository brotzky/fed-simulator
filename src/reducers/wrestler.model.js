import Backbone from "backbone"

const Model = Backbone.Model.extend({
  defaults: {
    id: "1",
    name: "Default",
    brand: "",
    male: true,
    rating: 80,
    damage: 80,
    wins: 0,
    losses: 0,
  },
})

export default Model
