import { gql } from 'graphql-request';

export function getQueryTodosInCategory(category) {
  return gql`
    {
      category(name: "${category}") {
        todos {
          text
          icon
          id
        }
      }
    }
  `;
}

export function getQueryTodosAll() {
  return gql`
    {
      todos {
        text
        icon
        id
      }
    }
  `;
}

export function getQueryAddSuggestion(text) {
  return gql`
    mutation {
      addSuggestion(text: "${text}") {
        text
      }
    }
  `;
}

export function getQueryTodosByIds(category) {
  return gql`
    {
      category(name: "${category}") {
        todos {
          text
          icon
          id
        }
      }
    }
  `;
}
