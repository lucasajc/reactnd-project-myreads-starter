import React from 'react';
import BookInfo from './BookInfo';

class SearchBooks extends React.Component {

	state = {
		query: ''
	}

  handleSearch = (e) => {
    e.preventDefault()
    this.setState({query: e.target.value})

    this.props.onSearch(this.state.query);

  }

	render(){

    const books = this.props.searchResults;
    console.log(books);
		return (
	       <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" >Close</a>
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
    	)
	}

}

export default SearchBooks;