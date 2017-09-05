import { Model } from "backbone"
import forEach from "lodash.foreach"
import sanitizer from "sanitizer"
import clone from "lodash.clone"

import { getId } from "../helpers/hash"

export default class extends Model {
  initialize() {
    forEach(this.attributes, (val, key) => this.set(key, this.sanitize(val)))
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
