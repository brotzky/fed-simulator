import React from "react"
import { Router, hashHistory } from "react-router"
import { Provider } from "react-redux"
import { context } from "./components/context-holder/default"
import ContextHolder from "./components/context-holder/context-holder"
import routes from "./routes"
import configureStore from "./store/configure-store"

const store = configureStore()

export default function Root(props) {
  return (
    <Provider store={store}>
      <ContextHolder context={context}>
        <Router
          key={new Date()}
          history={hashHistory}
          routes={routes()}
        />
      </ContextHolder>
    </Provider>
  )
}
