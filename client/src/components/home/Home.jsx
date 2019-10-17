import React, { Component } from "react";

export default class Home extends Component {

  render() {
      return (
        <div className="home-container">
          <h1>Welcome!</h1>
          <img
            src="https://turntable.kagiso.io/images/iStock-dad-son-homework-min.width-800.jpg"
            alt="logo"
          />
          <p>Los padres atraves de las actividades que envia el profesor efectua los refuerzo en casa para que sus hijos den un mayor rendimiento en el colegio.</p>
          <iframe id="player" title="home video" type="text/html" width="640" height="360" src="http://www.youtube.com/embed/0VMYDJKxGkM" frameBorder="0"></iframe>

        </div>
      );
    
  }
}
