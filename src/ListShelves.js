import React from 'react';
import BookInfo from './BookInfo'

class ListShelves extends React.Component {

	render(){

    	const {books} = this.props;
    	console.log(books);

		return (
	      <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf=="currentlyReading").map((book)=>(
                      	<BookInfo
              				book={book}
           				/>                     		
                      ))}
                    </ol>
                  </div>

                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf=="wantToRead").map((book)=>(
                      	<BookInfo
              				book={book}
           				/>                     		
                      ))}
                    </ol>
                  </div>

                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf=="read").map((book)=>(
                      	<BookInfo
              				book={book}
           				/>                     		
                      ))}
                    </ol>
                  </div>

                </div>
              </div>
            </div>
            <div className="open-search">
              <a >Add a book</a>
            </div>
          </div>
    	)
	}

}

export default ListShelves;