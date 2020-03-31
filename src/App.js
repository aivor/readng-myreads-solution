import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ReadBooks from './ReadBooks';
import CurrentlyReading from './CurrentlyReading';
import WantToRead from './WantToRead';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import { debounce } from 'throttle-debounce';

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
  resetBooks = ()=>{
    this.setState({searchResults:[]})
  }
  searchBooks = debounce(300,false,query=>{
    if(query.length === 0) {
      return this.setState( {searchResults:[]})
    }

    if(query.length > 0) {
     BooksAPI.search(query).then(books => {

      if(books.error) {
        this.setState( { searchResults: []})
      } else {
        this.setState({ searchResults:books})
      }
     });
    }
  }
  )
  render() {
   const read = this.state.books.filter( book => book.shelf === 'read');
   const wantToRead = this.state.books.filter( book => book.shelf === 'wantToRead' );
   const currentlyReading = this.state.books.filter( book => book.shelf === 'currentlyReading')
    return (
      <div className="app">
        <Route exact path='/' render={ ()=> (
           <div className='list-books'>
           <div className='list-books-title'>
             <h1>MyReads</h1>
           </div>
           <div className='list-books-content'>
             <div>
               <CurrentlyReading books={currentlyReading} handleChange={this.handleChange}/>
               <WantToRead books={wantToRead} handleChange={this.handleChange}/>
               <ReadBooks books={read} handleChange={this.handleChange}/>
             </div>
           </div>
         <div className="open-search">
         <Link to='/search'><button>Add a book</button></Link>
       </div>
       </div>
        )}/>

         <Route path='/search' 
           component={SearchBooks}
          />
      </div>
    )
        }    
}

export default BooksApp;
