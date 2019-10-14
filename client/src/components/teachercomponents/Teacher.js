import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Teacher.css";
import RouteServices from '../../services/RouteService'

class Teacher extends Component {
  constructor(props) {
    super(props);
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
        <h1>Teacher "pendiente colocar el nombre en el codigo"</h1>
       
        
        <Link to="/profile">Back</Link>

      </div>
        
      </React.Fragment>
    );
  }
}

export default Teacher;
