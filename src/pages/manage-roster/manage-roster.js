import React from "react"
import Helmet from "react-helmet"

import Wrestlers from "../../components/wrestlers/container"
import Input from "../../components/form/input"
import Image from "../../components/form/image"
import HeaderOne from "../../components/h1/h1"

import "./manage-roster.scss"

const NOOP = () => {}

const UpdateWrestlersPage = ({
  showWrestlersFilters = false,
  currentWrestler = null,
  onWrestlerPointsUpdated = NOOP,
  onWrestlersNameUpdated = NOOP,
  onImageUpdated = NOOP,
  onWrestlerClick = NOOP,
}) => {
  return (
    <div className="page manage-roster">
      <Helmet title="Update the Wrestlers!" />
      <HeaderOne>Update the Wrestlers!</HeaderOne>
      <div className="row">
        <If condition={!currentWrestler}>
          <p>Click a wrestler to edit them!</p>
        </If>
        <div className="col-xs-12">
          <Wrestlers
            onWrestlerClick={onWrestlerClick}
            showFilter={showWrestlersFilters}
          />
        </div>
      </div>
      <If condition={currentWrestler}>
        <div className="row">
          <div className="col-xs-12">
            <div className="box">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Points</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Input
                        onChange={onWrestlersNameUpdated}
                        value={currentWrestler.name}
                      />
                    </td>
                    <td>
                      <Input
                        onChange={onWrestlerPointsUpdated}
                        value={currentWrestler.points}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="box center-xs">
              <Image name={"image"} changeHandler={onImageUpdated} />
            </div>
          </div>
        </div>
      </If>
    </div>
  )
}

export default UpdateWrestlersPage
