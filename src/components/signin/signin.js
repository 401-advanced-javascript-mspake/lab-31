import React from 'react';
import superagent from 'superagent';
import { AuthContext } from '../context/auth-context';
import { Unless, When } from '../if/index';

require('dotenv').config();


const API = process.env.REACT_APP_API;

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  static contextType = AuthContext;

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(this.state.username, this.state.password)
      .then((response) => {
        this.context.login(response.text);
      })
      .catch(console.error);
  };


  render() {
    return (
      <>
      <Unless condition={this.context.loggedin}>
        <form>
          <input type='text' name='username' placeholder='username' onChange={this.handleChange}></input>
          <input type='password' name='password' placeholder='password' onChange={this.handleChange}></input>
          <button onClick={this.handleSubmit}>Open Sesame</button>
        </form>
      </Unless>

      <When condition={this.context.loggedin}>
        <button onClick={this.context.logout}>Log Out</button>
      </When>
      </>
    );
  }
}

export default Signin;
