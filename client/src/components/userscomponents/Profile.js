import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null, editProfile: false, phone: "",  email: ""};
    this.service = new AuthService();

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"]});
  }
  
  openEdit() {
    console.log(this.props)
    this.setState({
      editProfile: true,
      phone: this.props.userInSession.phone,
      email: this.props.userInSession.email
    });
  }

  closeEdit() {
    this.setState({
      phone:"",
      email:"",
      password:"",
      editProfile: false
    });
  }
  
  updateProfile = event => {
    event.preventDefault();
    const phone = this.state.phone;
    const email = this.state.email
debugger
    this.service
      .updateProfile(phone, email)
      .then(response => {
    this.setState({
      phone: "",
      email: "",
    });
    this.props.getUser(response.user);
  })
  .catch(error => {
    this.setState({
      phone: phone,
      email: email,
      error: true
    });
  });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  
  render() {
    return (
      <>
      <div>
        {this.props.userInSession.role==='teacher'?
          <h1>Teacher {this.props.userInSession.firstname} {this.props.userInSession.surnames}:</h1>
          : <h1>Parent {this.props.userInSession.firstname} {this.props.userInSession.surnames}</h1>}
        {!this.state.editProfile && 
          <button onClick={()=>this.openEdit()}>Edit Profile</button>
        }
        <img src="https://epss.ucla.edu/media/images/profile_pictures/default.jpg" alt="profile-imgDefault"/>
        <p>debo mirar la manera de obtener una vista de actualizacion de datos de usuario</p>
        <Link to="/home"><p>Back to Home</p></Link>
        {this.props.userInSession.role==='teacher'?
          <Link to="/addStudent"><p>Add Student</p></Link>
        :null}
        {this.props.userInSession.role==='teacher'?
          <Link to="/addActivity"><p>Add Activity</p></Link>
        :null}
      </div>

      <div>
        {this.state.editProfile && 
          <form onSubmit={this.updateProfile}>
          <h1>si quieres editar tu  perfil modifica acontinuacion:</h1>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={this.state.phone} onChange={e => this.handleChange(e)}            />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)}            />
          </div>
          <input type="submit" value="Update Profile" onClick={()=>this.closeEdit()}/>
          </form>
        }
      </div>
      </>
    );
  }
}
