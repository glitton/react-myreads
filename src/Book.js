import React from "react";
import "./App.css";

function Book(props) {

  // Method that takes user's input via the dropdown
  function handleChange (event) {
    event.preventDefault();
    props.moveBook(props.book, event.target.value);
  }

  // Method to handle when no imagelinks are available
  function bookImage(book) {
    if (props.book.imageLinks && props.book.imageLinks.thumbnail) {
      return `url(${props.book.imageLinks.thumbnail})`;
    } else {
      return "none";
    }
  }

  const book = props.book;

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `${bookImage(book)}`
              }}
            />
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf} onChange={handleChange}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }

export default Book;
