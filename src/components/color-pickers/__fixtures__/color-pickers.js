export default {
  props: {
		backgroundColor: "red",
		color: "white",
		onChangeBackgroundColor: (data) => console.log("onChangeBackgroundColor", data),
		onChangeColor: (data) => console.log("onChangeColor", data),
	}
}
