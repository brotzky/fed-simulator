import { compose, withState, withHandlers, withProps } from "recompose"
import { connect } from "react-redux"

import { createWrestler } from "../../actions/roster"
import EditWrestler from "./wrestler"

const defaultWrestler = {
  brandId: null,
  championshipId: null,
  id: false,
  male: true,
  image: "",
  name: "Vacant",
  points: 40,
}
export default compose(
  connect(state => ({
    brands: state.brands,
    championships: state.championships,
  })),
  withState("id", "createWrestler", defaultWrestler.id),
  withState("brandId", "onBrandSelected", defaultWrestler.brandId),
  withState("championshipId", "onChampionshipSelected", defaultWrestler.championshipId),
  withState("points", "onPointsUpdate", defaultWrestler.points),
  withState("male", "onGenderUpdate", defaultWrestler.male),
  withState("name", "onNameUpdate", defaultWrestler.name),
  withState("image", "onImageUpdate", defaultWrestler.image),
  withHandlers({
    onBrandSelected: ({ onBrandSelected, }) => brandId => onBrandSelected(String(brandId)),
    onChampionshipSelected: ({ onChampionshipSelected, }) => championshipId => onChampionshipSelected(String(championshipId)),
    onPointsUpdate: ({ onPointsUpdate, }) => e => onPointsUpdate(Number(e.target.value)),
    onNameUpdate: ({ onNameUpdate, }) => e => onNameUpdate(String(e.target.value)),
    onGenderUpdate: ({ onGenderUpdate, }) => male => onGenderUpdate(Boolean(male)),
    onImageUpdate: ({ onImageUpdate, }) => (name, value) => onImageUpdate(String(value)),
    onCreate: props => () => {
      const wrestler = {
        brandId: props.brandId,
        id: defaultWrestler.id,
        image: props.image,
        name: props.name,
        male: props.male,
        points: props.points,
      }
      props.dispatch(createWrestler(wrestler))

      props.onBrandSelected(defaultWrestler.championshipId)
      props.onChampionshipSelected(defaultWrestler.brandId)
      props.onImageUpdate(defaultWrestler.image)
      props.onGenderUpdate(defaultWrestler.male)
      props.onNameUpdate(defaultWrestler.name)
      props.onPointsUpdate(defaultWrestler.points)
    },
  }),
  withProps({
    showDelete: false,
  })
)(EditWrestler)
