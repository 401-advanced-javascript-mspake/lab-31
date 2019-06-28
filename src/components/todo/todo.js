import React from 'react';
import Counter from '../counter/counter';
import Form from '../form/form';
import List from '../list/list';
import Signin from '../signin/signin';
import RoleValidation from '../role-permission/role-permission';

import { When } from '../if/index';

// import { Context } from '../context/context';
import { AuthContext } from '../context/auth-context';

import './todo.scss';

class ToDo extends React.Component {
  // static contextType = Context;

  render() {
    return (
      <>
        <AuthContext.Consumer>
          { user => (
            <>
            <Signin />
            
            <When condition={user.loggedin}>
              <section className="todo">
                <div>
                  <RoleValidation capability='read'>
                    <Counter />
                  </RoleValidation>
                </div>

                <div>
                  <RoleValidation capability='create'>
                    <Form />
                  </RoleValidation>
                </div>

                <div>
                  <RoleValidation capability='read'>
                    <List />
                  </RoleValidation>
                </div>
              </section>
            </When>
            </>
          )}
        </AuthContext.Consumer>
      </>
    );
  }
}

export default ToDo;
