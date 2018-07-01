import React from "react";
import BookInfo from "./BookInfo";
import PropTypes from "prop-types";

/**
 * @description renders the Shelf component
 */
class Shelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  /**
   * @description renders the Shelf component
   * @returns jsx containing the component
   */

  render() {
    const { books, shelfTitle, shelf } = this.props;

    return (
      <div>
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === shelf).map(book => (
              <li key={book.id}>
                <BookInfo
                  book={book}
                  onChangeBookShelf={this.props.onChangeBookShelf}
                  onChangeBookRating={this.props.onChangeBookRating}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
