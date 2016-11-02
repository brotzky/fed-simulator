import React from 'react'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { context } from './components/context-holder/default'
import ContextHolder from './components/context-holder/context-holder'
import routes from './routes'
import configureStore from './store/configure-store'

const store = configureStore()

export default class FourSquare extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ContextHolder context={context}>
          <Router
            history={browserHistory}
            routes={routes()}
          />
        </ContextHolder>
      </Provider>
    )
  }
}
