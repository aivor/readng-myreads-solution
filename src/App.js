import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ReadBooks from './ReadBooks';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState( ()=>({
        books
      }))
    })
  }
  handleChange = book => event => {
    const shelf = event.target.value;
    
    BooksAPI.update(book,shelf);
    
    let updatedBooks = [];
    updatedBooks = this.state.books.filter( b => b.id !== book.id)

    if(shelf !== 'none') {
      book.shelf = shelf;
      updatedBooks = updatedBooks.concat(book)
    }
    this.setState({
      books:updatedBooks
    })
  }

  render() {
   const read = this.state.books.filter( book => book.shelf === 'read');
   const wantToRead = this.state.books.filter( book => book.shelf === 'wantToRead' );
   const currentlyReading = this.state.books.filter( book => book.shelf === 'currentlyReading')
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <CurrentlyReading books={currentlyReading} handleChange={this.handleChange} />
              <WantToRead books={wantToRead} handleChange={this.handleChange} />
              <ReadBooks books={read} handleChange={this.handleChange} />
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
