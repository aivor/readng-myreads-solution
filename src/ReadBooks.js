import React from 'react';
import BookShelf from './BookShelf';

let ReadBooks= (props) => {
    const{books,handleChange} = props
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
                <BookShelf books={books} handleChange={handleChange} />
            </div>
        </div>
    )
}
export default ReadBooks;