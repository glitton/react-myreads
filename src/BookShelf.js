import React from 'react';
import './App.css'
import Book from './Book';

function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelf.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map(book => {
            return (
              <Book
                book={book}
                shelf={book.shelf}
                key={book.id}
                moveBook={props.moveBook}
              />
            )}
          )}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
