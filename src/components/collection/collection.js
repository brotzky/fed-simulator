import React from "react"
import PropTypes from "prop-types"

import ColorPickers from "../color-pickers/color-pickers"
import GenderIcon from "../icons/gender"
import Input from "../form/input"

const NOOP = () => {}

const Collection = ({
  canUpdateColors = false,
  onChangeBackgroundColor = NOOP,
  onChangeColor = NOOP,
  canUpdateName = true,
  onChangeName = NOOP,
  canUpdateBrand = false,
  onChangeBrand = NOOP,
  canUpdateGender = false,
  onChangeGender = NOOP,
  canDelete = false,
  onDelete = NOOP,
  brands = [],
  collection = [],
  style = {},
}) => {
  return (
    <div className="collection">
      {collection.map(item => {
        if (item.style) {
          style = item.style
        }
        return (
          <div key={item.id} className="item row middle-xs" style={style}>
            <If condition={canUpdateName}>
              <div className="col-xs-10">
                <div className="box">
                  <Input style={style} value={item.name} onChange={event => onChangeName(item, event)} />
                </div>
              </div>
            </If>
            <If condition={canUpdateGender}>
              <div className="col-xs">
                <div className="box">
                  <GenderIcon gender={item.male} onClick={event => onChangeGender(item, event)} />
                </div>
              </div>
            </If>
            <If condition={canUpdateColors}>
              <div className="col-xs">
                <div className="box">
                  <ColorPickers
                    onChangeColor={event => onChangeColor(item, event)}
                    onChangeBackgroundColor={event => onChangeBackgroundColor(item, event)}
                    {...item.style}
                  />
                </div>
              </div>
            </If>
            <If condition={canDelete}>
              <div className="col-xs">
                <div className="box">
                  <a onClick={() => onDelete(item.id)}>
                    <span className="icon fa fa-trash-o fa-md" />
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
  onChangeName: PropTypes.func,
  canUpdateColors: PropTypes.bool,
  onChangeBackgroundColor: PropTypes.func,
  onChangeColor: PropTypes.func,
  canUpdateName: PropTypes.bool,
  canUpdateBrand: PropTypes.bool,
  onChangeBrand: PropTypes.func,
  canUpdateGender: PropTypes.bool,
  onChangeGender: PropTypes.func,
  canDelete: PropTypes.bool,
  onDelete: PropTypes.func,
  brands: PropTypes.array,
  collection: PropTypes.array,
  style: PropTypes.object,
}

export default Collection
