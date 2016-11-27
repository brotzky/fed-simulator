const sprite = require("sprite-webpack-plugin")

module.exports = {
  plugins: [
    new sprite({
      source : "scripts/generate/import/wrestlers/",
      imgPath: "src/imgs/",
      cssPath: "src/stylesheets/",
      processor: "scss",
      spriteName: "wrestlers",
      orientation: "horizontal",
    }),
    new sprite({
      source : "scripts/generate/import/championships/",
      imgPath: "src/imgs/",
      cssPath: "src/stylesheets/",
      processor: "scss",
      spriteName: "championships",
      orientation: "horizontal",
    }),
  ],
}
