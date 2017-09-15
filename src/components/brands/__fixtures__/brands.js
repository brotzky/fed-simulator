export default {
  props: {
    highlighted: 1,
    style: {
      backgroundColor: "orange",
      color: "white"
    },
    onBrandClick: (data) => console.log(data),
    brands: [
      {
        "id": "1",
        "name": "Raw",
        "style": {
          "color": "white",
          "backgroundColor": "red"
        }
      },
      {
        "id": "2",
        "name": "Smackdown",
        "style": {
          "color": "white",
          "backgroundColor": "blue"
        }
      }
    ]
  }
};
