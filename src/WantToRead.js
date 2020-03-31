import React from 'react';
import BookShelf from './BookShelf';

let WantToRead=(props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Want To Read</h2>
            <BookShelf books={props.books} />
        </div>
    )
}
export default WantToRead;