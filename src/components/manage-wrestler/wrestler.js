import React from "react"
import PropTypes from "prop-types"

import Brands from "../brands/brands"
import Button from "../button/button"
import Image from "../form/image"
import Input from "../form/input"

import "./manage-wrestler.scss"

const NOOP = () => {}
const genderBrands = [{ id: true, name: "male", style: { backgroundColor: "blue", }, }, { id: false, name: "female", style: { backgroundColor: "red", }, },]

const EditWrestler = ({
  brandId,
  championshipId,
  brands,
  championships,
  image,
  name,
  male,
  id,
  onBrandSelected,
  onChampionshipSelected,
  onImageUpdate,
  onDelete,
  onCreate,
  showDelete,
  onPointsUpdate,
  onGenderUpdate,
  onNameUpdate,
  points,
}) => (
  <div className="manage-wrestler">
    <h3 tabIndex="0">{name}</h3>
    <div className="row bottom-xs">
      <div className="col-xs">
        <div className="box">
          <label htmlFor="name">Brand</label>
          <div tabIndex="0" className="brands">
            <Brands onClick={onBrandSelected} highlighted={brandId} brands={brands} />
          </div>
        </div>
      </div>
    </div>
    <div className="row bottom-xs">
      <div className="col-xs">
        <div className="box">
          <label htmlFor="name">Championship</label>
          <div tabIndex="0" className="championships">
            <Brands
              onKeyPress={onChampionshipSelected}
              onClick={onChampionshipSelected}
              highlighted={championshipId}
              brands={championships.filter(item => item.male === male)}
            />
          </div>
        </div>
      </div>
    </div>
    <div className="row bottom-xs">
      <div className="col-xs">
        <div tabIndex="0" className="box gender">
          <label htmlFor="gender">Gender</label>
          <Brands onKeyPress={onGenderUpdate} onClick={onGenderUpdate} highlighted={male} brands={genderBrands} />
        </div>
      </div>
    </div>
    <div className="row bottom-xs">
      <div className="col-xs-12 col-lg-8">
        <div tabIndex="0" className="box">
          <label htmlFor="name">Name</label>
          <Input id="name" onChange={onNameUpdate} value={name} />
        </div>
      </div>
      <div className="col-lg-4 col-xs-12">
        <div className="box">
          <Image id="image" name="image" label={image ? "" : "Drop image here"} value={image} onChange={onImageUpdate} />
        </div>
      </div>
    </div>
    <div className="row bottom-xs">
      <div className="col-xs">
        <div tabIndex="0" className="box">
          <label htmlFor="points">Points</label>
          <Input id="points" onChange={onPointsUpdate} value={points} />
        </div>
      </div>
      <If condition={showDelete}>
        <div className="col-lg-4 col-xs-12">
          <div tabIndex="0" className="box">
            <Button classes="btn-delete" onClick={onDelete}>
              <i className="icon fa fa-trash" /> Delete wrestler
            </Button>
          </div>
        </div>
      </If>
      <If condition={!id}>
        <div className="col-lg-4 col-xs-12">
          <div className="box">
            <Button tabIndex="0" classes="btn-create" onKeyPress={onCreate} onClick={onCreate} value="Create wrestler" />
          </div>
        </div>
      </If>
    </div>
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
  points: PropTypes.number,
  showDelete: PropTypes.bool,
}

EditWrestler.defaultProps = {
  brandId: "",
  brands: [],
  championshipId: "",
  championships: [],
  id: false,
  image: "",
  male: true,
  name: "",
  onBrandSelected: NOOP,
  onChampionshipSelected: NOOP,
  onCreate: NOOP,
  onDelete: NOOP,
  onGenderUpdate: NOOP,
  onImageUpdate: NOOP,
  onNameUpdate: NOOP,
  onPointsUpdate: NOOP,
  points: 0,
  showDelete: true,
}
export default EditWrestler
