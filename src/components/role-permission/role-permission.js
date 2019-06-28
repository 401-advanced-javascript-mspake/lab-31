
import React, { useContext } from 'react';
import jsonWebToken from 'jsonwebtoken';
import { AuthContext } from '../context/auth-context';
import { When } from '../if/index';

require('dotenv').config();

const SECRET = process.env.REACT_APP_SECRET;

function RoleValidation(props) {
  const authContext = useContext(AuthContext);
  let user = null;
  let hasCorrectRole;

  if (authContext.token) {
    user = jsonWebToken.verify(authContext.token, 'supersecret');
  }

  if (user) {
    if (props.capability) {
      hasCorrectRole = user.capabilities.includes(props.capability);
    } else {
      hasCorrectRole = true;
    }
  }

  return (
      <When condition={hasCorrectRole}>
          { props.children }
      </When>
  );
}


export default RoleValidation;
