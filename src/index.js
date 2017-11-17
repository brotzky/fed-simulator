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

ReactDOM.render(App, rootEl)
FastClick.attach(rootEl)
