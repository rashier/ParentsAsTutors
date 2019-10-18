import React, { Component } from "react"                      ;
import { Link } from             "react-router-dom"           ;
import                           "../styles/Teacher.scss"      ;
import RouteServices from        "../../services/RouteService";

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.route = new RouteServices();
    this.state = {
      loggedInUser : null,
      students     : []  ,
      selectStudent: null,
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

  openEdit() {
    this.setState({
      editProfile: true,
      grade      : this.state.selectStudent.grade,
      school     : this.state.selectStudent.school
    });
  }

  closeEdit() {
    this.setState({
      editProfile: false
    });
  }

  updateStudent = event => {
    event.preventDefault();
    const grade  = this.state.grade;
    const school = this.state.school;
    this.route
      .updatestudent(this.state.selectStudent._id, grade, school)
      .then(response => {
        this.setState(
          {
            selectStudent:response
          },
          () => {
            this.closeEdit();
          }
        );
      })
      .catch(error => {
        this.setState({
          grade : grade,
          school: school,
          error : true
        });
      });
  };

  studentChange = event => {
    const { value } = event.target;
    this.setState({
      selectStudent: this.state.students.filter(
        student => student._id === value
      )[0]
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { selectStudent, editProfile } = this.state;

    return (
      <React.Fragment>
        <div className="teacher-container">
          <h1>Teacher {this.props.userInSession.firstname}!</h1>
          <div className="teacher-students-container">
          <h2>These are your students:</h2>
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
          {!!selectStudent ? (
            <div className="teacher-select-student">
              <table className={!editProfile ? "date-student-container" : "formNone"}>
                <thead>
                  <tr>
                    <th>Student name</th>
                    <th>Grade</th>
                    <th>School</th>
                    <th>Parent's Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectStudent.studentname}</td>
                    <td>{selectStudent.grade}</td>
                    <td>{selectStudent.school}</td>
                    <td>{selectStudent.emailparent}</td>
                  </tr>
                </tbody>
                    {!editProfile && (
                        <button className="allbutton" onClick={() => this.openEdit()}>
                          Edit Student
                        </button>
                    )}
              </table>
              <form onSubmit={this.updateStudent} className={editProfile ? "studentupsdate-form" : "formNone"}>
                <h1>For edit this student:</h1>
                <div className="teacher-select-student">
                <table>
                  <thead>
                    <tr>
                      <th>Student name</th>
                      <th>Grade</th>
                      <th>School</th>
                      <th>Parent's Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectStudent.studentname}</td>
                      <td>
                        <input type="text" name="grade" defaultValue={selectStudent.grade} onChange={e => this.handleChange(e)}></input>
                      </td>
                      <td>
                        <input type="text" name="school" defaultValue={selectStudent.school} onChange={e => this.handleChange(e)}></input>
                      </td>
                      <td>{selectStudent.emailparent}</td>
                      {!editProfile && (
                        <td><button onClick={() => this.openEdit()}>
                          Edit Student
                        </button></td>
                      )}
                    </tr>
                  </tbody>
                </table>
                <input className="allbutton" type="submit" value="Update Student" />
                </div>
              </form>
            </div>
          ) : null}
        {this.state.selectStudent!==null? 
        <div className="activities-student-container">
          <h1>Activities</h1>
          <table>
            <thead>
              <tr>
                <th>SUBJECT</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>VIDEO</th>
              </tr>
            </thead>
            <tbody>
              {this.state.selectStudent!==null? 
                this.state.selectStudent.activities.map((activity,idx)=>{
                  return (
                    <tr key={idx}>
                      <td>{activity.subject}</td>
                      <td>{activity.title}</td>
                      <td>{activity.activity}</td>
                      <td><img width="200" height="200" alt="activity" src={activity.imgPath}/></td>
                      <td><iframe id="player" title={"video"+idx} type="text/html" width="320" height="180" src={activity.video} frameBorder="0" /></td>
                    </tr>
                  )
                })
              : null}
            </tbody>
          </table>
        </div>
        : null}
        </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Teacher;
