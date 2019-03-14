import gql from "graphql-tag";

export const GET_ALL_TODOS = gql`
  query {
    todos {
      id
      name
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation removeTodo($id: String!) {
    removeTodo(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($id: String!, $name: String!) {
    updateTodo(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const ADD_TODO_MUTATION = gql`
  mutation addTodo($name: String!) {
    addTodo(name: $name) {
      id
      name
    }
  }
`;
