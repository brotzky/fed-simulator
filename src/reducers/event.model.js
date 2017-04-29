import Backbone from 'backbone'
import _each from 'lodash/each'
import _escape from 'lodash/escape'
import {hashCode} from '../helpers/hash'

const Model = Backbone.Model.extend({
  defaults: {
    id: hashCode(new Date().toString()),
    name: 'Default',
    date: Date(),
    size: 'xs',
    rating: 0,
    matches: [],
  },

  initialize() {
    _each(this.attributes, (val, key) => this.set(key, this.sanitize(val)))
  },

  sanitize(str) {
    if (typeof str === 'string') {
      str = _escape(str)
    }
    return str
  },
})

export default Model
