import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: [],
     searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
/*
  updateBookShelf = (id,shelf) => {
    this.setState((state) => ({
      books: state.books.map((b)=>{
        if(b.id===id){
          b.shelf = shelf;
        }
        return b;
      })
    }))
  }
*/
  updateBookShelf = (id,shelf) => {
    BooksAPI.get(id).then((book)=>{
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      });
    })
  }

  getSearchResults = (query) =>{
    BooksAPI.search(query).then((result) => {
      if(result===undefined){
        this.setState({searchResults: [] });
      }
      else{
        if(!result.error)
          this.setState({searchResults: result})
        else
          this.setState({searchResults: [] });
      }
      
    });
    //console.log(this.state.searchResults);
  }

  render() {
    //console.log(this.state.books);
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <ListShelves
              books={this.state.books}
              onChangeBookShelf={this.updateBookShelf}
            />
          )}/>
        <Route path='/search' render={() => (
            <SearchBooks
              onSearch={this.getSearchResults}
              searchResults={this.state.searchResults}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
