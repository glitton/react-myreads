import React from 'react';
import './App.css';

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  // Method that takes user's input via the dropdown
  handleChange(event) {
    this.props.moveBook(this.props.book, event.target.value);
  }

  // Method to handle when no imagelinks are available
  bookImage(book) {
    if (this.props.book.imageLinks && this.props.book.imageLinks.thumbnail) {
      return `url(${this.props.book.imageLinks.thumbnail})`
    } else {
      return 'none';
    }
  }

  render() {
    const book = this.props.book;
    return (
<<<<<<< HEAD
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `${this.bookImage(book)}`}}></div>
                <div className="book-shelf-changer">
                  <select defaultValue={book.shelf || "none"}
                          onChange={this.handleChange}
                  >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
=======
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `${this.bookImage(book)}`}}></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf}
                      onChange={this.handleChange}
              >
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
>>>>>>> 1602ad97d7b73f8086eb6d28d0dbb79c1054b4f8
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;
