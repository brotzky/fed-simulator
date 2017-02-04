import React from "react"
import Perf from "react-addons-perf"
import "./stylesheets/main"

export default class PerfProfiler extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      started: false,
    }
  }

  toggle = () => {
    const { started, } = this.state

    started ? Perf.stop() : Perf.start()

    this.setState({
      started: !started,
    })
  }

  printWasted = () => {
    const lastMeasurements = Perf.getLastMeasurements()

    Perf.printWasted(lastMeasurements)
  }

  printOperations = () => {
    const lastMeasurements = Perf.getLastMeasurements()

    Perf.printOperations(lastMeasurements)
  }

  render() {
    const { started, } = this.state

    return (
      <div className="perf-profiler">
        <h5>
          Performance Profiler
        </h5>
        <button onClick={this.toggle}>
          {started ? "Stop" : "Start"}
        </button>
        <button onClick={this.printWasted}>
          Print Wasted
        </button>
        <button onClick={this.printOperations}>
          Print Operations
        </button>
      </div>
    )
  }
}