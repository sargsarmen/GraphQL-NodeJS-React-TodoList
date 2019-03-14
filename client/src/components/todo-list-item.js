import React from "react";
import { graphql } from "react-apollo";
import {
  GET_ALL_TODOS,
  DELETE_TODO_MUTATION,
  UPDATE_TODO_MUTATION
} from "../graphql";

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInEditMode: false,
      name: ""
    };
  }

  onEdit = () => {
    const { isInEditMode, name } = this.state;
    const { todo, client } = this.props;

    if (isInEditMode) {
      client.mutate({
        mutation: UPDATE_TODO_MUTATION,
        variables: { id: todo.id, name },
        update: (cache, { data: { updateTodo } }) => {
          const data = cache.readQuery({ query: GET_ALL_TODOS });

          const changedIndex = data.todos.findIndex(
            t => t.id === updateTodo.id
          );
          data.todos[changedIndex] = updateTodo;
          cache.writeQuery({ query: GET_ALL_TODOS, data });

          this.setState({ isInEditMode: false });
        }
      });
    } else {
      this.setState({ isInEditMode: true, name: todo.name });
    }
  };

  onDelete = () => {
    const { todo, mutate } = this.props;
    mutate({
      mutation: DELETE_TODO_MUTATION,
      variables: { id: todo.id },
      update: (cache, { data: { removeTodo } }) => {
        const data = cache.readQuery({ query: GET_ALL_TODOS });
        const todos = data.todos.filter(t => t.id !== removeTodo.id);
        cache.writeQuery({ query: GET_ALL_TODOS, data: { todos } });
      }
    });
  };

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { isInEditMode, name } = this.state;
    const { todo } = this.props;
    const editBtnText = isInEditMode ? "Save" : "Edit";

    return (
      <li>
        <div>
          {isInEditMode ? (
            <input type="text" value={name} onChange={this.onChange} />
          ) : (
            <p>{todo.name}</p>
          )}
        </div>
        <div>
          <input
            type="button"
            className="btn btn-edit"
            value={editBtnText}
            onClick={this.onEdit}
          />
          <input
            type="button"
            className="btn btn-delete"
            value="Delete"
            onClick={this.onDelete}
          />
        </div>
      </li>
    );
  }
}

const TodoListItemWithMutation = graphql(
  UPDATE_TODO_MUTATION,
  DELETE_TODO_MUTATION
)(TodoListItem);
export default TodoListItemWithMutation;
