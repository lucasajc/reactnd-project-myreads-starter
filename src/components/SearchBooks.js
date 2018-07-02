/*
NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
*/

import React from "react";
import BookInfo from "./BookInfo";
import { Link } from "react-router-dom";
import LoadingScreen from "react-loading-screen";
import PropTypes from "prop-types";

/**
 * @description renders the SearchBooks component
 */
class SearchBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  state = {
    query: ""
  };

  /**
   * @description handles the trigger of the book search event
   * @param {e} object - The seach event
   */
  handleSearch = e => {
    e.preventDefault();
    this.setState({ query: e.target.value });
    this.props.onSearch(e.target.value);
  };

  /**
   * @description renders the SearchBooks component
   * @returns jsx containing the component
   */

  render() {
    const books = this.props.searchResults;
    const loading = this.props.loading;
    
    return (
      <LoadingScreen
        loading={loading}
        bgColor="#FFE4B5"
        spinnerColor="#CD5C5C"
        textColor="#676767"
        text="Moving to your shelves..."
      >
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                onChange={this.handleSearch}
                placeholder="Search by title or author"
              />
            </div>
          </div>

          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.query!== "" && books.map(book => (
                <li key={book.id}>
                  <BookInfo
                    book={book}
                    onChangeBookShelf={this.props.onChangeBookShelf}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </LoadingScreen>
    );
  }
}

export default SearchBooks;
