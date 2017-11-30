import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const StyleBrands = ({ styleInline, }) => {
  return <style dangerouslySetInnerHTML={{ __html: styleInline, }} />
}

StyleBrands.defaultProps = {
  styleInline: "",
}
StyleBrands.propTypes = {
  styleInline: PropTypes.string,
}

export default connect(state => ({
  styleInline: state.federation.brands.reduce(
    (prevVal, item) =>
      prevVal +
      ` .${item.id} .points {
          background-color: ${item.style.backgroundColor};
          color: ${item.style.color};
        }
        .${item.id} .trophy {
          color: ${item.style.backgroundColor};
        }
        `,
    ""
  ),
}))(StyleBrands)
