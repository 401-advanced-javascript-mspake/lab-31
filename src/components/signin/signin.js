import React, { useContext, useState } from 'react';
import superagent from 'superagent';
import { AuthContext } from '../context/auth-context';
import { Unless, When } from '../if/index';

require('dotenv').config();

const API = process.env.REACT_APP_API;

function Signin(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const authContext = useContext(AuthContext);

  function handleChange(event) {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then((response) => {
        authContext.login(response.text);
      })
      .catch(console.error);
  }

  return (
    <>
    <Unless condition={authContext.loggedin}>
      <form>
        <input type='text' name='username' placeholder='username' onChange={handleChange}></input>
        <input type='password' name='password' placeholder='password' onChange={handleChange}></input>
        <button onClick={handleSubmit}>Open Sesame</button>
      </form>
    </Unless>

    <When condition={authContext.loggedin}>
      <button onClick={authContext.logout}>Log Out</button>
    </When>
    </>
  );
}


// class Signin extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: null,
//       password: null,
//     };
//   }

//   static contextType = AuthContext;

//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     superagent
//       .post(`${API}/signin`)
//       .auth(this.state.username, this.state.password)
//       .then((response) => {
//         this.context.login(response.text);
//       })
//       .catch(console.error);
//   };


//   render() {
//     return (
//       <>
//       <Unless condition={this.context.loggedin}>
//         <form>
//           <input type='text' name='username' placeholder='username' onChange={this.handleChange}></input>
//           <input type='password' name='password' placeholder='password' onChange={this.handleChange}></input>
//           <button onClick={this.handleSubmit}>Open Sesame</button>
//         </form>
//       </Unless>

//       <When condition={this.context.loggedin}>
//         <button onClick={this.context.logout}>Log Out</button>
//       </When>
//       </>
//     );
//   }
// }

export default Signin;
