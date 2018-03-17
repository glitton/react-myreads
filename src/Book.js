import React from 'react';
import './App.css';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Method that takes user's input via the dropdown
  handleChange(event) {
    this.props.moveBook(this.props.book, event.target.value);
  }

  render() {
    return (
          <li key={this.props.book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                  <select defaultValue=
                    {this.props.book.shelf}
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
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">{this.props.book.authors}</div>
            </div>
          </li>
    );
  }
}

export default Book;
