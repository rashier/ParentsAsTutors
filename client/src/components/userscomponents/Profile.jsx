import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "../styles/Profile.scss"


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
      editProfile: false
    });
  }
  
  updateProfile = event => {
    event.preventDefault();
    const phone = this.state.phone;
    const email = this.state.email
    this.service.updateprofile(this.props.userInSession._id,phone, email)
      .then(response => {
    this.setState({
      phone: this.props.userInSession.phone,
      email: this.props.userInSession.email,
    }, ()=>{
      this.props.fetch()
      this.closeEdit()
    });
    
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
      <div className="profile-container">
        {this.props.userInSession.role==='teacher'?
          <h1>Teacher {this.props.userInSession.firstname} {this.props.userInSession.surnames}:</h1>
          : <h1>Parent {this.props.userInSession.firstname} {this.props.userInSession.surnames}</h1>}
        <div className="profile-img-container">
          <div className="profile-buttons">
          {!this.state.editProfile && 
            <button  className="allbutton" onClick={()=>this.openEdit()}>Edit Profile</button>
          }
          {this.props.userInSession.role==='teacher'?
          <Link to="/addStudent"><p className="allbutton" >Students</p></Link>
        :<Link to="/sons"><p className="allbutton">Sons</p></Link>}
        {this.props.userInSession.role==='teacher'?
          <Link to="/addActivity"><p className="allbutton">Activities</p></Link>
        :null}
        </div>
          <img src="https://epss.ucla.edu/media/images/profile_pictures/default.jpg" alt="profile-imgDefault"/>
        </div>


      <div className="profile-update-form">
        {this.state.editProfile && 
          <form onSubmit={this.updateProfile}>
          <h1>Edit the field that you wish change:</h1>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={this.state.phone} onChange={e => this.handleChange(e)}/>
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)}/>
          </div>
          <input className="allbutton" type="submit" value="Update Profile"/>
          </form>
        }
      </div>
      </div>
      </>
    );
  }
}
