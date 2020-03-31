import React from 'react';
import BookShelf from './BookShelf';

let WantToRead=(props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <div className="bookshelf-books">
                <BookShelf books={props.books} handleChange={props.handleChange}/>
            </div>
        </div>
    )
}
export default WantToRead;