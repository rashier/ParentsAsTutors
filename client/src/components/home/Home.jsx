import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-img-container">
          <h1>GAIN THE KNOWLEDGE YOU NEED TO HELP YOUR CHILD SUCCEED</h1>
          <img
            src="https://turntable.kagiso.io/images/iStock-dad-son-homework-min.width-800.jpg"
            alt="logo"
          />
        </div>
        <div className="home-video-art">
            <h2>Be Your Child's First Teacher</h2>
          <article>
            <p>
              Parents as Tutors actively builds families' capacity to impact
              student achievement by arming all parents with academic tools and
              strategies needed to partner with teachers in helping their
              children learn to read and read to learn. Parents as Tutors also
              support school districts, organizations, extended learning
              programs, and institutions that espouse the dual-capacity
              framework of creating process conditions linked to learning — this
              occurs when we connect families to teaching/learning goals and
              build their capacity to partner for student achievement.
            </p>
          <iframe
            id="player"
            title="home video"
            type="text/html"
            width="640"
            height="360"
            src="https://www.youtube.com/embed/XdRRJDNJLPo?controls=1"
            frameBorder="0"
          ></iframe>
          </article>

        </div>
      </div>
    );
  }
}
