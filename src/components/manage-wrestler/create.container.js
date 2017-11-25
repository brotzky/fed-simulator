import { compose, withStateHandlers, withProps } from "recompose"
import { connect } from "react-redux"
import pick from "lodash.pick"

import { createWrestler } from "../../actions/roster"
import Wrestler from "./wrestler"

const defaultWrestler = {
  brandId: null,
  championshipId: null,
  id: null,
  image: "",
  male: true,
  name: "",
  points: 100,
}

const wrestlerKeys = Object.keys(defaultWrestler)

const stateHandlers = {
  onChampionshipSelected: () => championshipId => ({ championshipId: String(championshipId), }),
  onBrandSelected: () => brandId => ({ brandId: String(brandId), }),
  onPointsUpdate: () => e => ({ points: Number(e.target.value), }),
  onNameUpdate: () => e => ({ name: String(e.target.value), }),
  onGenderUpdate: () => male => ({ male: Boolean(male), }),
  onImageUpdate: () => (name, value) => ({ image: String(value), }),
  onResetImage: () => () => () => ({ image: null, }),
}

const mappedProps = props => ({
  showDelete: false,
  highlightNewest: true,
  onCreate: () => {
    props.onCreate(pick(props, wrestlerKeys))
    props.onClose()
  },
})

export default compose(
  connect(
    state => ({
      championships: state.federation.championships,
      brands: state.federation.brands,
      style: state.style,
    }),
    dispatch => ({
      onCreate: props => dispatch(createWrestler(props)),
    })
  ),
  withStateHandlers(defaultWrestler, stateHandlers),
  withProps(mappedProps)
)(Wrestler)
