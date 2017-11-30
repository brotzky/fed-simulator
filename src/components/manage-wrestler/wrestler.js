import React from "react"
import PropTypes from "prop-types"

import Labels from "../labels/labels"
import Button from "../button/button"
import Image from "../form/image"
import Input from "../form/input"
import { Reset } from "../icons"

import "./manage-wrestler.scss"

const NOOP = () => {}
const genderLabels = [{ id: true, name: "male", style: { backgroundColor: "blue", }, }, { id: false, name: "female", style: { backgroundColor: "red", }, },]

const EditWrestler = ({
  brandId = "",
  brands = [],
  championshipId = null,
  championships = [],
  id = false,
  image = "",
  male = true,
  name = "",
  onBrandSelected = NOOP,
  onChampionshipSelected = NOOP,
  onCreate = NOOP,
  onDelete = NOOP,
  onGenderUpdate = NOOP,
  onImageUpdate = NOOP,
  onNameUpdate = NOOP,
  onPointsUpdate = NOOP,
  onResetImage = NOOP,
  onResetChampionship = NOOP,
  points = 0,
  showDelete = true,
  style = {},
}) => (
  <div className="manage-wrestler" style={style}>
    <div className="name">
      <label htmlFor="name">Name</label>
      <Input tabIndex="0" id="name" onChange={onNameUpdate} value={name} />
    </div>
    <label htmlFor="name">Brand</label>
    <div className="brands">
      <Labels id="brands" tabIndex="0" onClick={onBrandSelected} highlighted={brandId} labels={brands} />
    </div>
    <If condition={id}>
      <label htmlFor="championshipId">
        Championship (<a onClick={onResetChampionship}>reset</a>)
      </label>
      <Labels
        id="championshipId"
        tabIndex="0"
        onClick={onChampionshipSelected}
        highlighted={championshipId}
        labels={championships.filter(item => item.male === male && item.brandId === brandId)}
      />
    </If>
    <div className="gender">
      <label htmlFor="gender">Gender</label>
      <Labels id="gender" tabIndex="0" onKeyPress={onGenderUpdate} onClick={onGenderUpdate} highlighted={male} labels={genderLabels} />
    </div>
    <div className="image">
      <label htmlFor="image">
        Image (<a onClick={onResetImage}>reset</a>)
      </label>
      <Image id="image" name="image" label={image ? "" : "Drop image here"} value={image} onChange={onImageUpdate} />
    </div>
    <div className="points">
      <label htmlFor="points">Points</label>
      <Input id="points" tabIndex="0" onChange={onPointsUpdate} value={points} />
    </div>
    <If condition={!id}>
      <div className="create">
        <Button tabIndex="0" classes="btn-create" onKeyPress={onCreate} onClick={onCreate} value="Create wrestler" />
      </div>
    </If>
    <If condition={showDelete}>
      <div className="delete">
        <Button tabIndex="0" classes="btn-delete" onKeyPress={onDelete} onClick={onDelete}>
          <Reset /> Delete wrestler
        </Button>
      </div>
    </If>
  </div>
)

EditWrestler.propTypes = {
  brandId: PropTypes.any,
  brands: PropTypes.array,
  championships: PropTypes.array,
  championshipId: PropTypes.any,
  id: PropTypes.any,
  image: PropTypes.string,
  male: PropTypes.bool,
  name: PropTypes.string,
  onBrandSelected: PropTypes.func,
  onChampionshipSelected: PropTypes.func,
  onCreate: PropTypes.func,
  onDelete: PropTypes.func,
  onGenderUpdate: PropTypes.func,
  onImageUpdate: PropTypes.func,
  onNameUpdate: PropTypes.func,
  onPointsUpdate: PropTypes.func,
  onResetImage: PropTypes.func,
  onResetChampionship: PropTypes.func,
  points: PropTypes.number,
  showDelete: PropTypes.bool,
  style: PropTypes.shape({
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
}

export default EditWrestler
