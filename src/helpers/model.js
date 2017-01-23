import Backbone from "backbone"

const Brand = Backbone.Model.extend({
  defaults : {
    name    : null,
    gender  : null,
    picture : null,
  },
})

export { Brand }
