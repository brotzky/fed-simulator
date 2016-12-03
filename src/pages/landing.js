import React from "react"
import { Link } from "react-router"
import Helmet from "react-helmet"

export default class LandingPage extends React.Component {

  displayName = "LandingPage"

  render() {
    return (
      <div className="page landing">
        <Helmet title="Welcome to WWE Universe SIM" />
        <div className="row">
          <div className="col-xs-12">
            <h2>Welcome to the WWE Universe SIM</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare varius urna, non luctus tortor fringilla a. Sed faucibus mauris elementum ligula cursus maximus. Donec vulputate quis dolor et sollicitudin. Fusce blandit ante vel erat semper convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce gravida euismod turpis tempus malesuada. Donec sit amet orci posuere, vulputate eros nec, dapibus neque. Nulla tincidunt turpis elit, vitae placerat risus blandit at. In convallis congue eros non congue. Maecenas vel tellus dictum, malesuada ante in, maximus felis. Curabitur accumsan elit aliquam libero dapibus, vel cursus libero lacinia.
            </p>
            <p>
              Etiam placerat, quam non rutrum placerat, leo ante convallis justo, vitae blandit dui dui sed risus. In id aliquet odio. Vivamus lectus nunc, efficitur ac elit quis, volutpat aliquet lectus. Morbi ullamcorper, metus in fermentum feugiat, lorem felis aliquam leo, in dignissim erat purus eget nulla. Sed tortor arcu, volutpat sit amet tempor in, rhoncus quis orci. Aliquam gravida tincidunt est, ac porttitor magna egestas eu. Maecenas et neque vehicula ipsum molestie aliquam. Praesent vestibulum massa enim, quis tristique dolor rutrum nec. Integer sollicitudin sollicitudin quam at porttitor. Aenean hendrerit tincidunt odio non porta. Proin ultrices dictum libero eget fringilla. Etiam et ligula velit. Mauris non erat consectetur, posuere sapien vel, pretium justo. Pellentesque a turpis quis quam elementum imperdiet non in elit.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
