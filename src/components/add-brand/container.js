import { compose, withHandlers, withState } from "recompose"
import { connect } from "react-redux"

import AddBrand from "./add-brand"
import { createBrand } from "../../actions/brands"

const minLengthForCreate = 4
const randomHex = () => "#" + Math.floor(Math.random() * 16777215).toString(16)

export default compose(
  withState("name", "updateName", props => props.name),
  connect(null, dispatch => ({
    createBrand: brand => dispatch(createBrand(brand)),
  })),
  withHandlers({
    updateName: props => event => {
      props.updateName(event.target.value)

      if (props.name && props.name.length > minLengthForCreate) {
        props.createBrand({
          name: props.name,
          style: { backgroundColor: randomHex(), },
        })
        props.updateName("")
      }
    },
  })
)(AddBrand)
