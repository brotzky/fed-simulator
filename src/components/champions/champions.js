import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Wrestler from "../wrestler/wrestler"

import "./champions.scss"

export const Champions = ({ champions, championships }) => {
  return null
  //   <div className="row champions">
  //     {championships.map(championship => {
  //       const champion = champions.find(item => item.championshipId === championship.id)
  //       const secondChampion = championship.tag ? champions.find(item => item.championshipId === championship.id && item.id !== champion.id) : null
  //
  //       return (
  //         <div key={championship.id} className="col-xs champion">
  //           <h4>{championship.name}</h4>
  //           <Wrestler wrestler={champion} canDrag={false} />
  //           <If condition={secondChampion}>
  //             <Wrestler wrestler={secondChampion} canDrag={false} />
  //           </If>
  //         </div>
  //       )
  //     })}
  //   </div>
  // )
}

Champions.displayName = "Champions"

Champions.propTypes = {
  champions: PropTypes.array.isRequired,
  championships: PropTypes.array.isRequired,
}

export default connect(state => ({
  champions: state.federation.roster.filter(item => item.championshipId),
  championships: state.federation.championships,
}))(Champions)
