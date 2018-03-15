import React from 'react';
import './App.css'
import Book from './Book';

class BookShelf extends React.Component {
  constructor(props) {
    super(props);
  }

  render() [
    return (

        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf.shelfName}</h2>
            <Book />
          </div>
        </div>

    )
  ]
}

export default BookShelf;
