import { compose, withHandlers, withState } from "recompose"
import { connect } from "react-redux"
import chromatism from "chromatism"

import AddBrand from "./add-brand"
import { createBrand } from "../../actions/brands"

const minLengthForCreate = 2
const randomHex = () => "#" + Math.floor(Math.random() * 16777215).toString(16)

export default compose(
  withState("name", "updateName", props => props.name),
  connect(null, dispatch => ({
    createBrand: brand => dispatch(createBrand(brand)),
  })),
  withHandlers({
    updateName: props => event => {
      props.updateName(event.target.value)

      if (
        event.key === "Enter" &&
        props.name &&
        props.name.length > minLengthForCreate
      ) {
        const hex = randomHex()
        const color = chromatism.contrastRatio(hex).hex
        props.createBrand({
          name: props.name,
          style: { backgroundColor: hex, color, },
        })
        props.updateName("")
      }
    },
  })
)(AddBrand)
