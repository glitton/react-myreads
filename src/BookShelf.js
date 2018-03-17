import React from 'react';
import './App.css'
import Book from './Book';

class BookShelf extends React.Component {

  render() {
    console.log(this.props.books)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* Map over books array */}
            {this.props.books.map((book) => (
              <Book
                book={book}
                shelf={book.shelf}
                key={book.id}
                moveBook={this.props.moveBook}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
