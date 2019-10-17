import React, { Component } from "react";
// import "../styles/Teacher.css";
import RouteServices from "../../services/RouteService";

class Sons extends Component {
  constructor(props) {
    super(props);
    this.route = new RouteServices();
    this.state = {
      loggedInUser : null,
      students     : [],
      selectStudent: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  componentDidMount() {
    this.route.studentsUser().then(students => {
      this.setState({
        ...this.state,
        students: students.user.alumni
      });
    });
  }

  studentChange = event => {
    const { value } = event.target;
    this.setState({
      selectStudent: this.state.students.filter(
        student => student._id === value
      )[0]
    });
  };

  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({ [name]: value });
  // };

  render() {
    const { selectStudent } = this.state;

    return ( 
      <React.Fragment>
        <div className="teacher-container">
          <h1>Dear Parent {this.props.userInSession.firstname}</h1>
          <h2>Your sons:</h2>
          <select defaultValue={'DEFAULT'} onChange={e => this.studentChange(e)}>
            <option disabled value="DEFAULT">
              select a student
            </option>
            {this.state.students.map(student => (
              <option key={student._id} value={student._id}>
                {student.studentname}
              </option>
            ))}
            </select>
            {selectStudent ? (
              <table className="date-student-container">
                <thead>
                  <tr>
                    <th>Student name</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectStudent.studentname}</td>
                    <td>{selectStudent.grade}</td>
                  </tr>
                </tbody>
              </table>
            ):null}
            {selectStudent ? (
              <div className="activities-student-container">
                <table>
                  <thead>
                    <tr>
                      <th>SUBJECT</th>
                      <th>TITLE</th>
                      <th>DESCRIPTION</th>
                      <th>IMAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.selectStudent.activities.map((activity,idx)=>{
                        return (
                          <tr key={idx}>
                            <td>{activity.subject}</td>
                            <td>{activity.title}</td>
                            <td>{activity.activity}</td>
                            <td><img width="200" height="200" alt="activity" src={activity.imgPath}/></td>
                          </tr>
                        )
                      })}
                    </tbody>
                </table>
              </div>
            ):null}
        </div>
      </React.Fragment>
    )
  }
}

export default Sons;
