import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Teacher.css";
import RouteServices from '../../services/RouteService'

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.route = new RouteServices();
  }

  addNewActivity = event => {
    event.preventDefault();
    const studentname = this.state.studentname;
    const dni = this.state.dni;
    const grade = this.state.grade;
    const school = this.state.school;
    const emailparent = this.state.emailparent;

    this.route.addStudent(studentname, dni, grade, school, emailparent)
      .then(() => {
        this.setState(
          {...this.state}
        );
      })
      .catch(error => console.log(error))
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="teacher-container">
          <h1>For add new activity please complete this form:</h1>
          <div className="teacher-adds-container">
            <form onSubmit={this.addNewActivity}>
              <div className="teacher-inputs">
                <div className="teacher-label-container">
                  <label className="teacher-label">Subject:</label>
                  <label className="teacher-label">Estudiante:</label>
                  <label className="teacher-label">Description activity:</label>
                  <label className="teacher-label">Search video in Youtube:</label>
                </div>
                <div className="teacher-label-container">
                  <input className="teacher-input" type="text" name="newSubject" placeholder="Religion" onChange={e => this.handleChange(e)}/>
                  <select className="teacher-input" name="studentCode"/>
                  <input className="teacher-input" type="text" name="activity" placeholder="The student have adding..." onChange={e => this.handleChange(e)}/>
                  <input className="teacher-input"type="text" name="video" placeholder="eg. adding and subtracting integers" onChange={e => this.handleChange(e)}/>
                <button>Add new</button>
                </div>
              </div>
            </form>
          </div>
          <Link to="/profile">Back</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default AddActivity;
