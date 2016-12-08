import React from "react"
import Sound from "react-sound"
import bellImage from "./bell.png"
import bellSound from "./bell.mp3"
import "./stylesheets/main"

export default class Bell extends React.Component {

  static propTypes = {
    onBellRung: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    onBellRung: () => {},
    title: "",
  }

  onBellRung = () => {
    this.setState({
      soundPlaying: Sound.status.PLAYING,
    })
    this.props.onBellRung()
  }

  state = {
    soundPlaying: Sound.status.STOPPED,
    position: 0,
  }

  render() {
    return (
      <div onClick={this.onBellRung}
        className="bell">
        <img
          src={bellImage}
          title={this.props.title}
        />
        <h3 className="bell__header">
          {this.props.title}
        </h3>
        <Sound
          url={bellSound}
          playStatus={this.state.soundPlaying}
          playFromPosition={0}
          volume={100}
          onFinishedPlaying={() => {
            this.setState({
              soundPlaying: Sound.status.STOPPED,
              position: 0,
            })
          }}
        />
      </div>
    )
  }
}
