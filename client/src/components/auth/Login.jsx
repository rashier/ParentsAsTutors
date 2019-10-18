import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Images from "../../resources/Images";
import "../styles/Login.scss";

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

    return (
      <div className="login-container">
        <p>Please complete all fields for login:</p>
        <form className="login-form" onSubmit={this.handleFormSubmit}>

          <div className="login-input-container">
            <label>Username:</label>
            <input type="text" name="username" placeholder="enoky" value={this.state.username} onChange={e => this.handleChange(e)} />
          </div>

          <div className="login-input-container">
            <label>Password:</label>
            <input type="password" name="password" placeholder="********" value={this.state.password} onChange={e => this.handleChange(e)} />
          </div>

          <input className="allbutton" type="submit" value="Login" />
        </form>

      <h1>{this.state.error ? 'Error' : ''}</h1>
      </div>
    )
  }
}

export default Login;