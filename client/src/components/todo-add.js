import React from "react";
import { graphql } from "react-apollo";
import { ADD_TODO_MUTATION, GET_ALL_TODOS } from "../graphql";

class TodoAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onChange = e => {
    this.setState({ name: e.target.value });
  };

  onKeyUp = e => {
    const { mutate } = this.props;

    if (e.keyCode === 13) {
      const { name } = this.state;
      mutate({
        variables: { name },
        update: (cache, { data: { addTodo } }) => {
          const data = cache.readQuery({ query: GET_ALL_TODOS });
          data.todos.push(addTodo);
          cache.writeQuery({ query: GET_ALL_TODOS, data });
        }
      }).then(res => {
        this.setState({ name: "" });
      });
    }
  };

  render() {
    const { name } = this.state;

    return (
      <div className="add-todo">
        <input
          type="text"
          placeholder="Add todo"
          onKeyUp={this.onKeyUp}
          onChange={this.onChange}
          value={name}
        />
      </div>
    );
  }
}

const AddTodoWithMutation = graphql(ADD_TODO_MUTATION)(TodoAdd);
export default AddTodoWithMutation;
