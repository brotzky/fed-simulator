import constants from "../../constants"

export const context = {
  constants,
  onSetTitle: (value) => (document.title = value),
  onSetMeta: (name, content) => {
    const elements = document.getElementsByTagName("meta")
    Array.from(elements).forEach((element) => {
      if (element.getAttribute("name") === name) {
        element.parentNode.removeChild(element)
      }
    })
    const meta = document.createElement("meta")
    meta.setAttribute("name", name)
    meta.setAttribute("content", content)
    document
      .getElementsByTagName("head")[0]
      .appendChild(meta)
  },
}
