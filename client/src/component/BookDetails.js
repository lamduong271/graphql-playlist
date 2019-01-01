import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';

class BookDetails extends Component {
    displayBookDetail = () => {
        const {book} = this.props.data;
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All book by this author</p>
                    <ul>
                        {book.author.books.map(book=>{
                            return <li key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </div>
            )
        }
    }
    
  render() {

    return (
      <div>
        <ul id="book-details">
            {this.displayBookDetail()}
        </ul>
      </div>
    );
  }
}

export default graphql (getBookQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.bookId
            }
        }
    }
})(BookDetails);
