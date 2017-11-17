import React from "react"
import PropTypes from "prop-types"

import ColorPickers from "../color-pickers/color-pickers"
import Select from "../form/select"
import Input from "../form/input"
import { Reset, Gender } from "../icons"

const NOOP = () => {}

const mediumWidth = {
  maxWidth: "9rem",
}
const smallWidth = {
  maxWidth: "3rem",
}
const Collection = ({
  brands = [],
  canDelete = false,
  canUpdateBrand = false,
  canUpdateColors = false,
  canUpdateGender = false,
  canUpdateName = true,
  canUpdateWrestler = false,
  collection = [],
  onChangeBackgroundColor = NOOP,
  onChangeBrand = NOOP,
  onChangeColor = NOOP,
  onChangeGender = NOOP,
  onChangeName = NOOP,
  onChangeWrestler = NOOP,
  onDelete = NOOP,
  style = {},
  roster = [],
}) => {
  let newRoster = {
    true: roster.filter(wrestler => wrestler.male),
    false: roster.filter(wrestler => !wrestler.male),
  }
  return (
    <div className="collection">
      {collection.map(item => {
        if (item.style) {
          style = item.style
        }
        roster = newRoster[item.male]
        return (
          <div key={item.id} className="item row middle-xs" style={style}>
            <If condition={canUpdateName}>
              <div className="col-xs">
                <div className="box">
                  <Input style={style} value={item.name} onChange={event => onChangeName(item, event)} />
                </div>
              </div>
            </If>
            <If condition={canUpdateWrestler}>
              <div className="col-xs end-xs" style={mediumWidth}>
                <div className="box">
                  {new Array(item.amount).fill(1 / item.amount).map((key) => {
                    const wrestler = item.wrestlers && item.wrestlers[key + 1]

                    return <Select options={roster} value={wrestler} onChange={event => onChangeWrestler(item, event)} />
                  })}
                </div>
              </div>
            </If>
            <If condition={canUpdateBrand}>
              <div className="col-xs" style={mediumWidth}>
                <div className="box">
                  <Select options={brands} value={item.brandId} onChange={event => onChangeBrand(item, event)} />
                </div>
              </div>
            </If>
            <If condition={canUpdateWrestler}>
              <div className="col-xs" style={mediumWidth}>
                <div className="box">
                  <Select options={brands} value={item.brandId} onChange={event => onChangeBrand(item, event)} />
                </div>
              </div>
            </If>
            <If condition={canUpdateColors}>
              <div className="col-xs" style={smallWidth}>
                <div className="box">
                  <input type="number" value={item.amount} />
                </div>
              </div>
            </If>
            <If condition={canUpdateGender}>
              <div className="col-xs" style={smallWidth}>
                <div className="box">
                  <Gender gender={item.male} onClick={event => onChangeGender(item, event)} />
                </div>
              </div>
            </If>
            <If condition={canDelete}>
              <div className="col-xs end-xs" style={smallWidth}>
                <div className="box">
                  <a className="delete" onClick={() => onDelete(item.id)}>
                    <Reset />
                  </a>
                </div>
              </div>
            </If>
          </div>
        )
      })}
    </div>
  )
}

Collection.propTypes = {
  brands: PropTypes.array,
  canDelete: PropTypes.bool,
  canUpdateBrand: PropTypes.bool,
  canUpdateColors: PropTypes.bool,
  canUpdateGender: PropTypes.bool,
  canUpdateName: PropTypes.bool,
  canUpdateWrestler: PropTypes.bool,
  collection: PropTypes.array,
  onChangeBackgroundColor: PropTypes.func,
  onChangeBrand: PropTypes.func,
  onChangeColor: PropTypes.func,
  onChangeGender: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeWrestler: PropTypes.func,
  onDelete: PropTypes.func,
  roster: PropTypes.array,
  style: PropTypes.object,
}

export default Collection
