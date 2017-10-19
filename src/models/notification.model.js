import { Record } from "immutable"

export const schema = {
  id: undefined,
  title: false,
  type: "",
  read: false,
}

export const Notification = new Record(schema)

export default Notification
