import React from 'react';
import BookInfo from './BookInfo';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

class ListShelves extends React.Component {


	render(){

    	const {books,loading} = this.props;

		return (
		  <LoadingScreen
                        loading={loading}
                        bgColor='#f1f1f1'
                        spinnerColor='#9ee5f8'
                        textColor='#676767'
                        text='Organizing the shelves...'
                      > 
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
                      {books.filter((book) => book.shelf==="currentlyReading").map((book)=>(
                      	<li key={book.id}>
	                      	<BookInfo
	              				book={book}
	              				onChangeBookShelf = {this.props.onChangeBookShelf}
	           				/>
           				</li>                     		
                      ))}
                    </ol>
                  </div>

                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf==="wantToRead").map((book)=>(
                      	<li key={book.id}>
	                      	<BookInfo
	              				book={book}
	              				onChangeBookShelf = {this.props.onChangeBookShelf}
	           				/>
           				</li>                     		
                      ))}
                    </ol>
                  </div>

                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.filter((book) => book.shelf==="read").map((book)=>(
                      	<li key={book.id}>
	                      	<BookInfo
	              				book={book}
	              				onChangeBookShelf = {this.props.onChangeBookShelf}
	           				/>
           				</li>                    		
                      ))}
                    </ol>
                  </div>

                </div>
              </div>

            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>

                          </LoadingScreen>
          
    	)

	}

}

export default ListShelves;