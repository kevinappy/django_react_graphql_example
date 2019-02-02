import React, { Component } from "react";
import "./App.css";
import { QueryRenderer } from "react-relay";
import environment from "./RelayEnvironment";

const graphql = require("babel-plugin-relay/macro");

class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query AppQuery {
            students {
              id
              firstName
              lastName
              books {
                subject {
                  name
                }
              }
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          console.log(props);
          let elements = [];
          props.students.forEach(student => {
            let books = [];
            student.books.forEach(book => {
              books.push(<span>{book.subject.name} </span>);
            });
            elements.push(
              <div key={student.id}>
                Name: {student.firstName} {student.lastName} Books: {books}
              </div>
            );
          });
          return elements;
        }}
      />
    );
  }
}

export default App;
