import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class BookInfo extends React.Component {

  state = {
      rating: 0
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleChange = (e) => {
    e.preventDefault();
    if (this.props.onChangeBookShelf)
      this.props.onChangeBookShelf(e.target.id,e.target.value);
  }

	render(){

    const {book} = this.props;
    const { rating } = this.state;

		return (
                        
                          <div className="book">
                            <div className="book-top">
                              {book.imageLinks !== undefined ? (
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              
                                ) : (
                                  <div className="book-cover" style={{ width: 128, height: 193 }}></div>
                                )}
                              <div className="book-shelf-changer">
                                <select value={book.shelf} id={book.id} onChange={this.handleChange}>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="star" style={{fontSize: 30}}>
                              <StarRatingComponent 
                                name="rate" 
                                starCount={5}
                                value={book.averageRating}
                                onStarClick={this.onStarClick.bind(this)}
                              />
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">
                              {book.authors === undefined ? '' :book.authors.map((author)=> (`${author}`))}
                            </div>
                          </div> 
    )                  
	}

}
export default BookInfo;