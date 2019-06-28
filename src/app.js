import React from 'react';
import ContextProvider from './components/context/context';
import AuthContextprovider from './components/context/auth-context';

import ToDo from './components/todo/todo';

export default class App extends React.Component {
  render() {
    return (
    <AuthContextprovider>
        <ContextProvider>
          <ToDo />
        </ContextProvider>
    </AuthContextprovider>
    );
  }
}
