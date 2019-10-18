
import React, { Component } from "react";
import "./components/styles/App.scss";
import { withRouter } from "react-router-dom";
import { Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./services/AuthService";
import Profile from "./components/userscomponents/Profile";
import Home from "./components/home/Home";
import Teacher from "./components/teachercomponents/Teacher";
import AddActivity from "./components/teachercomponents/AddActivity";
import AddStudent from "./components/teachercomponents/AddStudent";
import Sons from "./components/parentcomponents/Sons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();

    this.fetchUser();
  }

  getUser = userObj => {
    this.setState(
      {
        loggedInUser: userObj
      },
      () => {
        this.props.history.push("/profile");
      }
    );
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null },()=>{this.props.history.push('/')});
    });
  };

  fetchUser=() =>{
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Redirect to="/home"></Redirect>
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout}/>
                <div className="App">
            <header className="App-header">
              <Switch>
                <Route exact path="/profile" render={() => <Profile fetch = {this.fetchUser} userInSession={this.state.loggedInUser}/>} />
                <Route exact path="/teacher" render={() => <Teacher userInSession={this.state.loggedInUser}/>} />
                <Route exact path="/home" render={() => <Home userInSession={this.state.loggedInUser}/>} />
                <Route exact path="/addStudent" render={() => <AddStudent userInSession={this.state.loggedInUser}/>} />
                <Route exact path="/addActivity" render={() => <AddActivity userInSession={this.state.loggedInUser}/>} />
                <Route exact path="/sons" render={() => <Sons userInSession={this.state.loggedInUser}/>} />
              </Switch>
            <footer>
              <ul>
                <li>About Us</li>
                <li>Contact</li>
                <li>Collaborate</li>
              </ul>
              <h3>Phone: (675) 433-3346</h3>
              <h5>Copyright © 2019 Web Site Design by Rashier.</h5>
            </footer>
            </header>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Redirect to="/"></Redirect>
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout}/>
                <div className="App">
            <header className="App-header">
              <Switch>
                <Route exact path="/signup" render={() => <Signup getUser={this.getUser} />}/>
                <Route exact path="/login" render={() => <Login getUser={this.getUser} />}/>
                <Route exact path="/" render={() => <Home />}/>
              </Switch>
            <footer>
              <ul>
                <li><a href="_blank">About Us</a></li>
                <li><a href="_blank">Contact</a></li>
                <li><a href="_blank">Collaborate</a></li>
              </ul>
              <h3>Phone: (675) 433-3346</h3>
              <h5>Copyright © 2019 Web Site Design by Rashier.</h5>
            </footer>
            </header>
          </div>

        </React.Fragment>
      );
    }
  }
}





export default withRouter(App);
