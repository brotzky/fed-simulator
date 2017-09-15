export default {
  props: {
    active: false,
    id: 1,
    name: "Raw",
    onClick: (data) => console.log("onClick", data),
    style: {
      color: "white",
      backgroundColor: "red"
    }
  }
}
