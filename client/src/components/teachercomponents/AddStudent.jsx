import React, { Component } from "react";
import { Link } from 'react-router-dom';
import RouteServices from '../../services/RouteService'

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { studentname: "", dni: "", phone: "", grade: "", school: "", emailparent: ""};
    this.route = new RouteServices();
  }

  addNewStudent = event => {
    event.preventDefault();
    const studentname = this.state.studentname;
    const dni = this.state.dni;
    const grade = this.state.grade;
    const school = this.state.school;
    const emailparent = this.state.emailparent;

    this.route.addStudent(studentname, dni, grade, school, emailparent)
      .then(() => {
        this.setState(
          {...this.state, 
            studentname: "", 
            dni: "", 
            phone: "", 
            grade: "", 
            school: "", 
            emailparent: ""}
        );
      })
      .catch(error => {
        this.setState({
          studentname: studentname,
          dni: dni,
          grade: grade,
          school: school,
          emailparent: emailparent,
          error: true
        })
      
      })
  };


  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
      <div className="teacher-container">
        <h1>For add new student please complete this form:</h1>
        <div className="teacher-adds-container">
        <form onSubmit={this.addNewStudent}>
          <div className="teacher-inputs">
            <div className="teacher-label-container">
              <label className="teacher-label">Student Name:</label>
              <label className="teacher-label">DNI or NIE:</label>
              <label className="teacher-label">Grade:</label>
              <label className="teacher-label">School:</label>
              <label className="teacher-label">Email Parent:</label>
            </div>
            <div className="teacher-label-container">
              <input className="teacher-input" type="text" value={this.state.studentname} name="studentname" placeholder="Sara Benavides Buitrago" onChange={e => this.handleChange(e)}/>
              <input className="teacher-input" type="text" value={this.state.dni} name="dni" placeholder="Y1234567R" onChange={e => this.handleChange(e)}/>
              <input className="teacher-input" type="text" value={this.state.grade} name="grade" placeholder="3B" onChange={e => this.handleChange(e)}/>
              <input className="teacher-input" type="text" value={this.state.school} name="school" placeholder="School Pablo Sarasate" onChange={e => this.handleChange(e)}/>
              <input className="teacher-input" type="text" value={this.state.emailparent} name="emailparent" placeholder="tatiana.buitrago@gmail.com" onChange={e => this.handleChange(e)}/>
              <input type="submit" value="Add Student"/>
            </div>
            <h1>{this.state.error ? "You must fill all fields" : ""}</h1>
          </div>
        </form>
        
        </div>

        <Link to="/profile">Back</Link>

      </div>
      </React.Fragment>
    );
  }
}

export default AddStudent;
