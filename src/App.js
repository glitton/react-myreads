import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBar from './SearchBar';


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
        showSearchPage: false,
        books: [],
        shelves: [
          {
            id: 1,
            name: 'currentlyReading',
            shelfName: 'Currently Reading'
          },
          {
            id: 2,
            name: 'wantToRead',
            shelfName: 'Want To Read'
          },
          {
            id: 3,
            name: 'read',
            shelfName: 'Read'
          }
        ],
      };

      this.moveBook = this.moveBook.bind(this);
    };

  // Use the BooksAPI getAll method to get all the books on load
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({ books })
    });
  };

  // Method to move book using its id, to another shelf
   moveBook = (chosenBook, newShelf) => {
     // Update the backend
     BooksAPI.update(chosenBook, newShelf).then(result => {
       this.setState(state => {
         const newState = {...state};
         // Filter out the book that user chose to move
         const userBookToMove = newState.books.filter(
           book => book.id === chosenBook.id
         );
         //Get the shelf value of user chosen book
         // console.log('This is the book to move' + JSON.stringify(userBookToMove));
         userBookToMove[0].shelf = newShelf;
         return({books: newState.books});
       });
     });
   };

  // Method to search for a book by title or author
  searchBook = (query) => {
    BooksAPI.search(query).then(books => {
      // set new state for books, its shelf should be none if the books isn't displayed
      // if book is already on a shelf, it's shelf state should be this.props.book.shelf
      this.setState({books});
      console.log('Search book output' + JSON.stringify(books));
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar
            books={this.state.books}
            searchBook={this.searchBook}
          />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                {/* Map over shelves and render new Bookshelf component */}
                {
                  this.state.shelves.map(shelf => {
                    return (
                      <BookShelf
                        key={shelf.id}
                        shelf={shelf}
                        books={this.state.books.filter(book => book.shelf === shelf.name)}
                        moveBook={this.moveBook}
                      />
                    )
                  })
                }
              )
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
};

export default BooksApp;
