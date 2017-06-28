import { AppContainer } from "react-hot-loader"
import FastClick from "fastclick"
import React from "react"
import ReactDOM from "react-dom"

import Page from "./components/page/index"

const rootEl = document.getElementById("root")

export const App = (
  <AppContainer>
    <Page />
  </AppContainer>
)

try {
  ReactDOM.render(App, rootEl)
  FastClick.attach(rootEl)
  if (module.hot) {
    module.hot.accept("./components/page/index", () => {
      const NextApp = require("./components/page/index").default // eslint-disable-line
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
