import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

class StyleBrands extends Component {
  render() {
    const styleInline = this.props.brands.reduce(
      (prevVal, item) =>
        prevVal +
        ` .${item.id} .points {
          background-color: ${item.style.backgroundColor};
          color: ${item.style.color};
        }`,
      ""
    )
    return <style dangerouslySetInnerHTML={{ __html: styleInline, }} />
  }
}

StyleBrands.defaultProps = {
  brands: [],
}
StyleBrands.propTypes = {
  brands: PropTypes.array,
}

export default connect(state => ({
  brands: state.federation.brands,
  championships: state.federation.championships,
  style: state.style,
  version: state.version,
}))(StyleBrands)
