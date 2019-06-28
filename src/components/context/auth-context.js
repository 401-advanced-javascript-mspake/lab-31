import React from 'react';
import cookie from 'react-cookies';

export const AuthContext = React.createContext();

class AuthContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      token: null,
      login: this.login,
      logout: this.logout,
    };
  }

  login = (token) => {
    cookie.save('user', token);
    this.setState({ loggedin: true, token });
  }

  logout = () => {
    cookie.remove('user');
    this.setState({ loggedin: false, token: null });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}


export default AuthContextProvider;
