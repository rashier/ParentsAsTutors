import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Images from "../../resources/Images";
import "../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
    this.images = new Images();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {

    return (<div className="login-container">
      <img className="login-img" src={this.images.logo} alt="logo children"/>

      <form onSubmit={this.handleFormSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
        </div>

        <input type="submit" value="Login" />
      </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
    </div>)
  }
}

export default Login;