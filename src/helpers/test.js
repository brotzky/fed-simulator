import React from 'react'
import chai from 'chai'
import sinon from 'sinon'
import { Provider } from 'react-redux'
import { shallow, mount, render } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import configureStore from '../store/configure-store'

const store = configureStore()

const {
  assert,
  expect,
} = chai
chai.should()
chai.expect()
chai.use(chaiEnzyme())

export {
  React,
  assert,
  Provider,
  expect,
  sinon,
  shallow,
  mount,
  render,
  store
}
