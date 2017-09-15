export default {
  props: {
		style: {
			backgroundColor: "red",
			color: "blue"
		},
		onClick: (data) => console.log("onClick", data),
		onChange: (data) => console.log("onChange", data),
	}
}
