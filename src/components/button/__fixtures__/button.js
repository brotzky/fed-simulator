export default {
  props: {
    value: "Click Me",
    children: false,
    classes: "btn btn-red",
    onClick: (data) => console.log("onClick", data)
  }
}
