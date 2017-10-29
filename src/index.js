import React from "react"
import ReactDOM from "react-dom"

import DefaultPage from "./pages/default/default"

const rootEl = document.getElementById("root")

export const App = <DefaultPage />

ReactDOM.render(App, rootEl)
