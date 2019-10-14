import React, { Component } from "react";
import ReactPlayer from 'react-player'

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
          <div><ReactPlayer url='https://www.youtube.com/watch?v=0VMYDJKxGkM' controls /></div>
        </div>
      );
    
  }
}
