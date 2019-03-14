import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TodoListItem from "./todo-list-item";

const TodoList = () => {
  return (
    <Query
      query={gql`
        query {
          todos {
            id
            name
          }
        }
      `}
      fetchPolicy="network-only"
    >
      {({ loading, error, data, client }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;

        return (
          <ul className="todo-ul" key="todo-list">
            {data.todos.map(todo => (
              <TodoListItem key={todo.id} todo={todo} client={client} />
            ))}
          </ul>
        );
      }}
    </Query>
  );
};
export default TodoList;
