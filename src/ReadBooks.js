import React from 'rect';
import BookShelf from './BookShelf';

let ReadBooks= (props) => {
    
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <BookShelf books={props.books} />
        </div>
    )
}
export default ReadBooks;