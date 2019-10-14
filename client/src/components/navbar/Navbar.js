// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Navbar.css";
import Images from "../../resources/Images";

//Para mirar el login social de google                         <==============
// import { GoogleLogin } from "react-google-login";                          |
// const responseGoogle = response => {                                       |
//   console.log(response);                                    <==============
// };

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.images = new Images();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  render() {
   
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <nav className="nav-style">
            <div className="nav-style-left">
              <div>
                <Link to="/home">
                <img className="navbar-logo" src={this.images.logo} alt="logo children"/>
                </Link>
              </div>
              <h1>Parents As Tutors</h1>
            </div>
            <div>
              <ul>
                {this.props.userInSession.role==='teacher'?
                  <li><Link className="nav-link" to="/teacher">Teacher</Link></li>
                :null}
                
                <li><Link className="nav-link" to="/profile">Profile</Link></li>
                <li><Link className="nav-link" to="/" onClick={this.handleLogout}>Logout</Link></li>
              </ul>
            </div>
          </nav>

          <div className="header"></div>
        </React.Fragment>
      );
    } else {
      return (
        <div>
          <nav className="nav-style">
          <div className="nav-style-left">
              <div>
                <img className="navbar-logo" src={this.images.logo} alt="logo children" />
              </div>
              <h1>Parents As Tutors</h1>
            </div>
            <ul>
              <li>
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
