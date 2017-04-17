import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {context} from './components/context-holder/default'
import ContextHolder from './components/context-holder/context-holder'
import Routes from './routes'
import configureStore from './store/configure-store'

const store = configureStore()

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ContextHolder context={context}>
          <Routes />
        </ContextHolder>
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('root'))
