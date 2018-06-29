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
     searchResults: [],
     loading: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({ loading: false });
    })
  }

  

  updateBookShelf = (id,shelf) => {
    this.setState({ loading: true });
    BooksAPI.get(id).then((book)=>{
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
        this.setState(state => ({
          searchResults: state.searchResults.filter((b) => b.id !== book.id)
        }))
      });
    }).then(() => this.setState({ loading: false }))
  }
  
  getSearchResults = (query) =>{
    BooksAPI.search(query).then((result) => {
      if(result!==undefined){
        if(!result.error){
          result.forEach(obj =>{
            obj.shelf = 'none'; 
          });
          this.setState({searchResults: result})
        }
        else{
          this.setState({searchResults: [] });
        }
      }
      else{
        this.setState({searchResults: [] })
      }
    }).catch(this.setState({searchResults: [] }));
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <ListShelves
              books={this.state.books}
              onChangeBookShelf={this.updateBookShelf}
              loading={this.state.loading}
            />
          )}/>
        <Route path='/search' render={() => (
            <SearchBooks
              onSearch={this.getSearchResults}
              searchResults={this.state.searchResults}
              onChangeBookShelf={this.updateBookShelf}
              loading={this.state.loading}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
