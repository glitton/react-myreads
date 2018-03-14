import React from 'react';
import './App.css'

class BookShelf extends React.Component {
  constructor(props) {
    super(props);
  }

  render() [
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <Book />
          </div>
        </div>
      </div>

    )
  ]
}

export default BookShelf;
