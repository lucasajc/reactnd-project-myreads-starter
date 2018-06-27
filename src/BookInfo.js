import React from 'react';

class BookInfo extends React.Component {

  handleChange = (e) => {
    e.preventDefault()
    if (this.props.onChangeBookShelf)
      this.props.onChangeBookShelf(e.target.id,e.target.value);
      
  }

	render(){

    const {book} = this.props;

		return (
                        
                          <div className="book">
                            <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
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
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">
                              {book.authors.map((author)=> (`${author}`))}
                            </div>
                          </div> 
    )                  
	}

}

export default BookInfo;