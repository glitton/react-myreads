import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResults: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    if (this.state.query !== " ") {
      this.setState({ query: event.target.value });

      BooksAPI.search(event.target.value)
        .then(searchResults => {
          if (searchResults.error) {
            this.setState({ searchResults: [] });
          } else {
            for (let result of searchResults) {
              result.shelf = "none";
              for (let book of this.props.books) {
                if (result.id === book.id) {
                  result.shelf = book.shelf;
                }
              }
            }
            this.setState({ searchResults });
          }
        })
        .catch(e => {
          this.setState({ searchResults: [] });
        });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map(book => (
              <Book
                book={book}
                key={book.id}
                shelf={book.shelf}
                moveBook={this.props.moveBook}
                books={this.props.books}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
