import React, { Component } from "react";
import AuthService from "../../services/AuthService";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { firstname: "", surnames: "", phone: "", email: "", username: "", password: "", role:"parent", };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const firstname = this.state.firstname;
    const surnames = this.state.surnames;
    const phone = this.state.phone;
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;
    const role = this.state.role;

    this.service
      .signup(firstname, surnames, phone, email, username, password,role)
      .then(response => {
        this.setState({
          firstname: "",
          surnames: "",
          phone: "",
          email: "",
          username: "",
          password: "",
          role:"parent"
        });
        this.props.getUser(response.user);
      })
      .catch(error => {
        this.setState({
          firstname: firstname,
          surnames: username,
          phone: phone,
          email: email,
          username: username,
          password: password,
          role:role,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h3>Welcome to Parents As Tutors! {this.state.role}</h3>
        <p>Do you want create a new account:</p>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>First Name:</label>
            <input type="text" name="firstname" value={this.state.firstname} onChange={e => this.handleChange(e)}            />
          </div>
          <div>
            <label>Surnames:</label>
            <input type="text" name="surnames" value={this.state.surnames} onChange={e => this.handleChange(e)}            />
          </div>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={this.state.phone} onChange={e => this.handleChange(e)}            />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)}            />
          </div>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)}            />
          </div>

          <div>
            <label>Password:</label>
            <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)}
            />
          </div>
          <div>
            <label>Role: </label>
            <select  name="role" value={this.state.role} onChange={e => this.handleChange(e)}>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <input type="submit" value="Sign up"/>
        </form>

        <h1>{this.state.error ? "Error" : ""}</h1>
      </div>
    );
  }
}

export default Signup;
