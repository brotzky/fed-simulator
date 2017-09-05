import React from "react"
import PropTypes from "prop-types"
import { FadeIn } from "animate-components"

import Brands from "../../components/brands/brands"
import Wrestlers from "../../components/wrestlers/container"
import Input from "../../components/form/input"
import Button from "../../components/button/button"
import Image from "../../components/form/image"

import { ANIMATION_SPEED } from "../../constants/animation"

import "./manage-roster.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({
  animations = true,
  brands = [],
  showWrestlersFilters = true,
  currentWrestler = null,
  onBrandClick = NOOP,
  onWrestlerPointsUpdated = NOOP,
  onWrestlersNameUpdated = NOOP,
  onImageUpdated = NOOP,
  onWrestlerDelete = NOOP,
  onWrestlerClick = NOOP,
  style = {},
}) => {
  return (
    <div className="page manage-roster">
      <If condition={currentWrestler}>
        <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <div className="row bottom-xs">
            <Brands onBrandClick={onBrandClick} highlighted={currentWrestler.brandId} brands={brands} />
          </div>
          <div className="row bottom-xs">
            <div className="col-xs-6 col-lg-8">
              <div className="box">
                <label htmlFor="name">Name</label>
                <Input id="name" onChange={onWrestlersNameUpdated} value={currentWrestler.name} />
              </div>
            </div>
            <div className="col-xs-6 col-lg-4">
              <div className="box">
                <Image id="image" name="image" label={currentWrestler.image ? "" : "Drop image here"} value={currentWrestler.image} onChange={onImageUpdated} />
              </div>
            </div>
          </div>
          <div className="row bottom-xs">
            <div className="col-xs-6 col-lg-8">
              <div className="box">
                <label htmlFor="points">Points</label>
                <Input id="points" onChange={onWrestlerPointsUpdated} value={currentWrestler.points} />
              </div>
            </div>
            <div className="col-xs-6 col-lg-4">
              <div className="box">
                <br />
                <Button classes="btn-delete" onClick={onWrestlerDelete}>
                  <i className="icon fa fa-trash" /> Delete wrestler
                </Button>
              </div>
            </div>
          </div>
          <br />
        </FadeIn>
      </If>
      <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
        <If condition={!currentWrestler}>
          <p className="text-center">
            <i className="icon fa fa-info-circle" /> Click a wrestler to edit them!
          </p>
        </If>
        <Wrestlers style={style} onWrestlerClick={onWrestlerClick} showFilter={showWrestlersFilters} />
      </FadeIn>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  animations: PropTypes.bool.isRequired,
  brands: PropTypes.array.isRequired,
  currentWrestler: PropTypes.object,
  onBrandClick: PropTypes.func.isRequired,
  onImageUpdated: PropTypes.func.isRequired,
  onWrestlerClick: PropTypes.func.isRequired,
  onWrestlerDelete: PropTypes.func.isRequired,
  onWrestlerPointsUpdated: PropTypes.func.isRequired,
  onWrestlersNameUpdated: PropTypes.func.isRequired,
  showWrestlersFilters: PropTypes.bool,
  style: PropTypes.object,
}

export default UpdateWrestlersPage
