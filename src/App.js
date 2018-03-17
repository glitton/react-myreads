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

      this.newMoveBook = this.newMoveBook.bind(this);
    }

  // Use the BooksAPI getAll method to get all the books on load
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({ books })
    });
  }

  // Method to move book using its id, to another shelf
  // moveBook = (chosenBook, newShelf) => {
  //   this.setState((state) => {
  //     // Filter out the book that user chose to move
  //     const userBookToMove = state.books.filter(book => book.id !== chosenBook.id);
  //     //Get the shelf value of user chosen book
  //     userBookToMove.shelf = newShelf
  //     return {
  //       // Updated state
  //       books: newShelf.concat(chosenBook)
  //     };
  //   });
  //   // Update the backend
  //   BooksAPI.update(chosenBook, newShelf);
  // };

  // Method to move book using its id, to another shelf
   newMoveBook = (chosenBook, newShelf) => {
     // Update the backend
     BooksAPI.update(chosenBook, newShelf).then(result => {
       this.setState(state => {
         const newState = {...state};
         // Filter out the book that user chose to move
         const userBookToMove = newState.books.filter(
           book => book.id === chosenBook.id
         );
         //Get the shelf value of user chosen book
         console.log('This is the book to move' + userBookToMove);
         userBookToMove[0].shelf = newShelf;
         return({books: newState.books});
       });
     });
   };

  render() {
    console.log(this.state.books)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar />
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
                        moveBook={this.newMoveBook}
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
}

export default BooksApp;
