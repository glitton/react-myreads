import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      books: [],
      shelves: [
        {
          id: 1,
          name: "currentlyReading",
          shelfName: "Currently Reading"
        },
        {
          id: 2,
          name: "wantToRead",
          shelfName: "Want To Read"
        },
        {
          id: 3,
          name: "read",
          shelfName: "Read"
        }
      ]
    };

    this.moveBook = this.moveBook.bind(this);
  }

  // Use the BooksAPI getAll method to get all the books on load
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  // Method to move books to other shelves
  moveBook = (chosenBook, newShelf) => {
    if (this.state.books.includes(chosenBook)) {
      let currentBooks = this.state.books;
      currentBooks[currentBooks.indexOf(chosenBook)].shelf = newShelf;
      BooksAPI.update(chosenBook, newShelf).then(result => {
        this.setState({ books: currentBooks });
      });
    } else {
      BooksAPI.update(chosenBook, newShelf).then(result => {
        BooksAPI.getAll().then(books => {
          chosenBook.shelf = newShelf;
          //remove book that was chosen add it to state later
          const oldBooksArray = this.state.books.filter(
            book => book.id !== chosenBook.id
          );
          this.setState(state => ({
            books: state.books.concat([oldBooksArray])
          }));
        });
      });
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks books={this.state.books} moveBook={this.moveBook} />
          )}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelves.map(shelf => {
                    return (
                      <BookShelf
                        key={shelf.id}
                        shelf={shelf}
                        books={this.state.books.filter(
                          book => book.shelf === shelf.name
                        )}
                        moveBook={this.moveBook}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
