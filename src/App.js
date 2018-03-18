import React from 'react';
import { Link, Route } from 'react-router-dom';
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
     BooksAPI.update(chosenBook, newShelf).then(result => {
       this.setState(previousState => {
         const newState = previousState; //output is an array
         // console.log('this is the new state' + JSON.stringify(newState));
         // filter the newState array and get the id of the book to move
         const chosenBookToMove = newState.books.filter(book => book.id === chosenBook.id);
         // console.log('chosen book' + JSON.stringify(chosenBookToMove));
         //grab the shelf property, this is the new shelf where the book will go
         chosenBookToMove[0].shelf = newShelf;
         return ({ books: newState.books })
       });
     });
   };

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBar
            books={this.state.books}
            moveBook={this.moveBook}
          />
        )}/>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
              <div className="list-books-content">
                <div>
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
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
      </div>
    )
  }
};

export default BooksApp;
