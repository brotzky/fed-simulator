import React from "react"
import PropTypes from "prop-types"
import { FadeIn } from "animate-components"

import Wrestlers from "../../components/wrestlers/container"
import Input from "../../components/form/input"
import Button from "../../components/button/button"
import Image from "../../components/form/image"

import { ANIMATION_SPEED } from "../../constants/animation"

import "./manage-roster.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({
  animations = true,
  showWrestlersFilters = false,
  currentWrestler = null,
  onWrestlerPointsUpdated = NOOP,
  onWrestlersNameUpdated = NOOP,
  onImageUpdated = NOOP,
  onWrestlerDelete = NOOP,
  onWrestlerClick = NOOP,
}) => {
  return (
    <div className="page manage-roster">
      <div className="row">
        <If condition={!currentWrestler}>
          <p>
            <i className="icon fa fa-info-circle" /> Click a wrestler to edit
            them!
          </p>
        </If>
        <div className="col-xs-12">
          <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
            <Wrestlers
              onWrestlerClick={onWrestlerClick}
              showFilter={showWrestlersFilters}
            />
          </FadeIn>
        </div>
      </div>
      <br />
      <If condition={currentWrestler}>
        <FadeIn iterations={Number(animations)} duration={ANIMATION_SPEED}>
          <div className="row">
            <div className="col-xs-12">
              <div className="box">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  onChange={onWrestlersNameUpdated}
                  value={currentWrestler.name}
                />
                <label htmlFor="points">Points</label>
              </div>
              <div className="box">
                <Input
                  id="points"
                  onChange={onWrestlerPointsUpdated}
                  value={currentWrestler.points}
                />
              </div>
              <div className="box">
                <label htmlFor="image">Profile Picture</label>
                <Image
                  id="image"
                  name="image"
                  label="Drop here"
                  value={currentWrestler.image}
                  onChange={onImageUpdated}
                />
              </div>
              <hr />
              <div className="box">
                <Button classes="btn-delete" onClick={onWrestlerDelete}>
                  <i className="icon fa fa-trash" /> Delete wrestler
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </If>
    </div>
  )
}

UpdateWrestlersPage.propTypes = {
  animations: PropTypes.bool.isRequired,
  showWrestlersFilters: PropTypes.bool,
  currentWrestler: PropTypes.object,
  onWrestlerPointsUpdated: PropTypes.func.isRequired,
  onWrestlersNameUpdated: PropTypes.func.isRequired,
  onImageUpdated: PropTypes.func.isRequired,
  onWrestlerDelete: PropTypes.func.isRequired,
  onWrestlerClick: PropTypes.func.isRequired,
}

export default UpdateWrestlersPage
