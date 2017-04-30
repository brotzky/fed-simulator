import Backbone from 'backbone'
import _each from 'lodash/each'
import sanitizer from 'sanitizer'

import {hashCode} from '../helpers/hash'

const Model = Backbone.Model.extend({
  defaults: {
    id: hashCode(new Date().toString()),
    name: 'Default',
    male: true,
    losses: 0,
    current_champion: '',
  },

  initialize() {
    _each(this.attributes, (val, key) => this.set(key, this.sanitize(val)))
  },

  sanitize(str) {
    if (typeof str === 'string') {
      str = sanitizer.escape(str)
    }
    return str
  },
})

export default Model
