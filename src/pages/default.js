import {connect} from 'react-redux'
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Default extends Component {
  displayName = 'Default'

  componentWillMount() {
    if (this.props.federation.name === '') {
      this.props.router.push('/name')
    } else if (this.props.federation.size === '') {
      this.props.router.push('/size')
    } else if (this.props.federation.backgroundColor === '') {
      this.props.router.push('/branding')
    } else {
      this.props.router.push('/roster')
    }
  }

  render() {
    const props = Object.keys(this.props)

    return (
      <section className="default">
        <h1>Default</h1>
        {props.map((name, key) => {
          return (
            <div key={key}>
              <h2>{name}</h2>
              {JSON.stringify(this.props[name])}
            </div>
          )
        })}
      </section>
    )
  }
}

Default.propTypes = {
  federation: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  shows: PropTypes.array.isRequired,
  roster: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  version: PropTypes.number.isRequired,
}

Default.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  federation: state.federation,
  events: state.events,
  shows: state.shows,
  roster: state.roster,
  settings: state.settings,
  version: state.version,
}))(Default)
