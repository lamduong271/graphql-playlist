import React, { Component } from 'react';
import BookList from './component/BookList';
import AddBook from './component/AddBook'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
//apollo client set up

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">
        <h1>Lam's Reading List</h1>
        <BookList></BookList>
        <AddBook></AddBook>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
