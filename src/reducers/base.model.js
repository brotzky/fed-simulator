import { Model } from "backbone"
import each from "lodash/each"
import sanitizer from "sanitizer"
import clone from "lodash/clone"

import { getId } from "../helpers/hash"

export default class extends Model {
  initialize() {
    each(this.attributes, (val, key) => this.set(key, this.sanitize(val)))
  }

  sanitize(str) {
    return typeof str === "string" ? sanitizer.escape(str) : str
  }

  toJSON() {
    const { id, } = this.attributes
    if (id === false) {
      this.attributes.id = getId()
    }

    return clone(this.attributes)
  }
}
