import Backbone from "backbone"

const Model = Backbone.Model.extend({
  defaults: {
    id: "1",
    name: "Default",
    male: true,
    canMoveBrands: true,
    sequence: 0,
    changes: 0,
    wrestlers: [],
    plateBackgroundColor: "gold",
    strapBackgroundColor: "black",
    plateColor: "black",
    plateShape: "circle",
    plateStrapSHape: "rectangle",
    buttons: true,
  },
})

export default Model
