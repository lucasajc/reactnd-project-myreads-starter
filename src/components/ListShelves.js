import React from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import PropTypes from "prop-types";

/**
 * @description renders the ListShelves component
 */
class ListShelves extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  shelves = [
    {path: 'currentlyReading', title: 'Currently Reading'},
    {path: 'wantToRead', title: 'Want to Read'},
    {path: 'read', title: 'Read'}
  ];

  /**
   * @description renders the ListShelves component
   * @returns jsx containing the component
   */

  render() {
    const { books, loading } = this.props;

    return (
      <LoadingScreen
        loading={loading}
        bgColor="#FFE4B5"
        spinnerColor="#CD5C5C"
        textColor="#676767"
        text="Organizing the shelves..."
      >
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <div>
              <div className="bookshelf">

                {this.shelves.map((shelf, index) => (
                 <Shelf
                   key={index}
                   onChangeBookShelf={this.props.onChangeBookShelf}
                   onChangeBookRating={this.props.onChangeBookRating}
                   books={books}
                   shelf={shelf.path}
                   shelfTitle={shelf.title}
                  />
                ))};

              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </LoadingScreen>
    );
  }
}

export default ListShelves;
