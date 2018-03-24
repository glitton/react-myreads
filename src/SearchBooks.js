import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book';

class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResults: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  };

  // Create method to search for a book and allow user to move it to their collection
  // handleSearch(event) {
  //   if (this.state.query !== " ") {
  //     this.setState({ query:event.target.value })
  //     BooksAPI.search(event.target.value).then(searchResults => {
  //       this.props.books.forEach(book => {
  //         let shelvedBook = searchResults.find(result => result.id === book.id);
  //         if (shelvedBook) {
  //           shelvedBook.shelf = book.shelf
  //         }
  //         this.setState({ searchResults: !searchResults || searchResults.error ? [] : searchResults })
  //       })
  //     })
  //   } else {
  //     this.setState({ searchResults: []})
  //   }
  // }

  // Create method to search for a book and allow user to move it to their collection
  handleSearch(event) {
    if (this.state.query !== " ") {
      this.setState({ query:event.target.value })
      BooksAPI.search(event.target.value).then(searchResults => {
        this.props.books.forEach(book => {
          let shelvedBook = searchResults.find(result => result.id === book.id);
          if (shelvedBook) {
            shelvedBook.shelf = book.shelf
          }
          this.setState({
            searchResults: !searchResults || searchResults.error ? [] : searchResults,
          })
        })
      })
    } else {
      this.setState({
        searchResults: [],
        query: ""
      })
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
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                moveBook={this.props.moveBook}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
