import { compose, withHandlers, withState } from "recompose"
import { connect } from "react-redux"
import chromatism from "chromatism"

import Create from "./create"
import { createChampionship } from "../../actions/champions"

const minLengthForCreate = 2
const randomHex = () => "#" + Math.floor(Math.random() * 16777215).toString(16)

export default compose(
  withState("name", "updateName", props => props.name),
  connect(null, dispatch => ({
    createChampionships: item => dispatch(createChampionship(item)),
  })),
  withHandlers({
    updateName: props => event => {
      props.updateName(event.target.value)

      if (event.key === "Enter" && props.name && props.name.length > minLengthForCreate) {
        const hex = randomHex()
        const color = chromatism.contrastRatio(hex).hex
        props.createChampionships({
          name: props.name,
          style: { backgroundColor: hex, color, },
        })
        props.updateName("")
      }
    },
  })
)(Create)
