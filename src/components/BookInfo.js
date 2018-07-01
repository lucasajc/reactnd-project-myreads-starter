import React from "react";
import StarRatingComponent from "react-star-rating-component";
import PropTypes from "prop-types";

/**
 * @description renders the BookInfo component
 */
class BookInfo extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  };

  state = {
    rating: 0
  };

  /**
   * @description handle the trigger of the book rating change event
   * @param {nextValue} integer - The next rating
   * @param {prevValue} integer - The previous rating
   * @param {name} string - The book id
   */
  onStarClick(nextValue, prevValue, name) {
    console.log(name);
    console.log(nextValue);
    if (this.props.onChangeBookRating)
      this.props.onChangeBookRating(name, nextValue);
  }

  /**
   * @description handles the trigger of the book shelf change event
   * @param {e} object - The seach event
   */
  handleChange = e => {
    e.preventDefault();
    if (this.props.onChangeBookShelf)
      this.props.onChangeBookShelf(e.target.id, e.target.value);
  };

  /**
   * @description renders the BookInfo component
   * @returns jsx containing the component
   */

  render() {
    const { book } = this.props;
    const { rating } = this.state;

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks !== undefined ? (
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            />
          ) : (
            <div className="book-cover" style={{ width: 128, height: 193 }} />
          )}
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              id={book.id}
              onChange={this.handleChange}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="star" style={{ fontSize: 30 }}>
          <StarRatingComponent
            name={book.id}
            starCount={5}
            value={book.averageRating}
            onStarClick={this.onStarClick.bind(this)}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors === undefined
            ? ""
            : book.authors.map(author => `${author}`)}
        </div>
      </div>
    );
  }
}
export default BookInfo;
