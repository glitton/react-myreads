import React from 'react';
import './App.css';

// import Book from './Book';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  // Method to search for a book by title or author
  // searchBook = (query) => {
  //   BooksAPI.search(query).then(books => {
  //     // set new state for books, its shelf should be none if the books isn't displayed
  //     // if book is already on a shelf, it's shelf state should be this.props.book.shelf
  //     this.setState({books});
  //     console.log('Search book output' + JSON.stringify(books));
  //   })
  // }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
              defaultValue={this.state.query}

            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* {this.props.books.map(book => {
              return (
                <Book
                  book={book}
                  shelf={book.shelf}
                  key={book.id}
                />
              )} */}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar;
