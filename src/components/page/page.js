import React from "react"
import { Link } from "react-router"
import Head from "../head/head"
import "../../stylesheets/base"
import logo from "./logo.png"
import "./stylesheets/main"
const navigationItems = [
  {
    url: "ppvs",
    title: "PPVs",
  },
  {
    url: "draft",
    title: "Draft",
  },
  {
    url: "champions",
    title: "Champions",
  },
  {
    url: "ranking",
    title: "Ranking",
  },
  {
    url: "show",
    title: "Create a show",
  },
]

export default class Page extends React.Component {

  render() {
    return (
      <div>
        <header className="header">
          <div className="navigation navigation--primary">
            {navigationItems.map((navigationItem, key) => {
              return (
                <div key={key} className="navigation__item">
                  <Link
                    to={navigationItem.url}>
                    {navigationItem.title}
                  </Link>
                </div>
              )
            })}
          </div>
        </header>
        <section className="container-fluid">
          {this.props.children}
        </section>
      </div>
    )
  }
}
