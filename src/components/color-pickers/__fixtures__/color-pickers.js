export default {
  props: {
		backgroundColor: "red",
		color: "blue",
		onChangeBackgroundColor: (data) => console.log("onChangeBackgroundColor", data),
		onChangeColor: (data) => console.log("onChangeColor", data),
	}
}
