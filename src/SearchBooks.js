import React from 'react';
import BookInfo from './BookInfo';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

class SearchBooks extends React.Component {

	state = {
		query: ''
	}

  handleSearch = (e) => {
    e.preventDefault()
    this.setState({query: e.target.value});
    this.props.onSearch(e.target.value);
  }

	render(){
    const books = this.props.searchResults;
    const loading = this.props.loading;
		return (
         <LoadingScreen
                        loading={loading}
                        bgColor='#f1f1f1'
                        spinnerColor='#9ee5f8'
                        textColor='#676767'
                        text='Moving to your shelves...'
                      >
	       <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={this.handleSearch} placeholder="Search by title or author"/>

              </div>
            </div>
            
            <div className="search-books-results">
             
              <ol className="books-grid">
                {books.map((book)=>(
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
          </LoadingScreen>
    	)
	}

}

export default SearchBooks;