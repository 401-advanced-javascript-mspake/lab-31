import React from 'react';
import { SingleItemForm } from '../form/form';
import { When } from '../if';
import { Context } from '../context/context';
import RoleValidation from '../role-permission/role-permission';

class List extends React.Component {
  static contextType = Context;

  render() {
    return (
      <ul id="list">
      {this.context.todoList
        && this.context.todoList.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item.id}
          >
            <span onClick={() => this.context.toggleComplete(item.id)}>
              {item.text}
            </span>
            <RoleValidation capability='update'>
              <button onClick={() => this.context.toggleEdit(item.id)}>
                edit
              </button>
              <When condition={this.context.editing === item.id}>
                <SingleItemForm item={item} />
              </When>
            </RoleValidation>
          </li>
        ))}
    </ul>
    );
  }
}

export default List;
