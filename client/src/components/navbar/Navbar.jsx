import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "../styles/Navbar.scss";
import Images from "../../resources/Images";

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
                <img className="navbar-logo rotate-center" src={this.images.logo} alt="logo children"/>
                </Link>
              </div>
              <Link to="/home">
              <h1>Parents As Tutors</h1>
              </Link>
            </div>
            <div>
              <ul>
                {this.props.userInSession.role==='teacher'?
                  <li><Link className="nav-link" to="/teacher">Teacher</Link></li>
                :null}
                {this.props.userInSession.role==='parent'?
                <li><Link className="nav-link" to="/sons">Sons</Link></li>
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
                <Link to="/">
                <img className="navbar-logo rotate-center" src={this.images.logo} alt="logo children" />
                </Link>
              </div>
              <Link to="/">
              <h1>Parents As Tutors</h1>
              </Link>
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
