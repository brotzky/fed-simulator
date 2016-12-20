const Sprite = require("sprite-webpack-plugin")

module.exports = {
  plugins: [
    new Sprite({
      source : "scripts/generate/import/ppvs/",
      imgPath: "src/imgs/",
      cssPath: "src/stylesheets/sprites",
      processor: "scss",
      spriteName: "ppvs",
      orientation: "horizontal",
    }),
    new Sprite({
      source : "scripts/generate/import/wrestlers/",
      imgPath: "src/imgs/",
      cssPath: "src/stylesheets/sprites",
      processor: "scss",
      spriteName: "wrestlers",
      orientation: "horizontal",
    }),
    new Sprite({
      source : "scripts/generate/import/championships/",
      imgPath: "src/imgs/",
      cssPath: "src/stylesheets/sprites",
      processor: "scss",
      spriteName: "championships",
      orientation: "horizontal",
    }),
    new Sprite({
      source : "scripts/generate/import/brands/",
      imgPath: "src/imgs/",
      cssPath: "src/stylesheets/sprites",
      processor: "scss",
      spriteName: "brands",
      orientation: "horizontal",
    }),
  ],
}
