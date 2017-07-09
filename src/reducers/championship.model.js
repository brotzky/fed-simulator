import { object, string, number, date } from "yup"

export const schema = object().shape({
  id: string().default(() => {
    return false
  }),
  current_champion: string(),
  name: string().required(),
  losses: number().positive().integer(),
  createdOn: date().default(() => {
    return new Date()
  }),
})

export default class Model {
  constructor(attributes) {
    this.attributes = attributes
  }

  toJSON() {
    return schema.cast({
      ...this.attributes,
    })
  }
}
