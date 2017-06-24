import React from "react"
import { AppContainer } from "react-hot-loader"
import Root from "./root"
import FastClick from "fastclick"
import ReactDOM from "react-dom"

const rootEl = document.getElementById("root")

export const App = (
  <AppContainer>
    <Root />
  </AppContainer>
)

try {
  ReactDOM.render(App, rootEl)
  FastClick.attach(rootEl)
  if (module.hot) {
    module.hot.accept("./root", () => {
      const NextApp = require("./root").default // eslint-disable-line
      ReactDOM.render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        rootEl
      )
    })
  }
} catch (err) {
  console.log("Render error", err)
}
