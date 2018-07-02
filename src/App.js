import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import ListShelves from "./components/ListShelves";
import SearchBooks from "./components/SearchBooks";
import { Route } from "react-router-dom";

/**
 * @description renders the main component
 */
class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    loading: true
  };

  /**
   * @description invoked immediately after the component is mounted
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      books.forEach(obj => {
        if (obj.averageRating === undefined) obj.averageRating = 0;
      });

      this.setState({ books });
      this.setState({ loading: false });
    });
  }

  /**
   * @description update the evaluation with the user's own rating
   * @param {integer} id - The id of the book
   * @param {integer} rating - The rating of the book
   */
  updateBookRating = (id, rating) => {
    this.setState({ loading: true });
    BooksAPI.get(id)
      .then(book => {
        book.averageRating = rating;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }));
      })
      .then(() => this.setState({ loading: false }));
  };

  /**
   * @description transfers a book from one shelf to another
   * @param {integer} id - The id of the book
   * @param {integer} string - The next shelf of the book
   */
  updateBookShelf = (id, shelf) => {
    this.setState({ loading: true });
    BooksAPI.get(id)
      .then(book => {
        BooksAPI.update(book, shelf).then(() => {
          book.shelf = shelf;
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat([book])
          }));
          this.setState(state => ({
            searchResults: state.searchResults.filter(b => b.id !== book.id)
          }));
        });
      })
      .then(() => this.setState({ loading: false }));
  };

  /**
   * @description transfers a book from one shelf to another
   * @param {string} query - The search text
   */

  getSearchResults = query => {
    BooksAPI.search(query)
      .then(result => {
        if (result !== undefined) {
          if (!result.error) {
            result.map(obj => {
              obj.shelf = this.state.books
                .filter(b => b.id === obj.id)
                .map(b => (b.id === obj.id ? b.shelf : "none"))[0];
              obj.averageRating = this.state.books
                .filter(b => b.id === obj.id)
                .map(b => (b.id === obj.id ? b.averageRating : 0))[0];

              if (obj.shelf === undefined) obj.shelf = "none";
              if (obj.averageRating === undefined) obj.averageRating = 0;
            });
            this.setState({ searchResults: result });
          } else {
            this.setState({ searchResults: [] });
          }
        } else {
          this.setState({ searchResults: [] });
        }
      })
      .catch(this.setState({ searchResults: [] }));
  };

  /**
   * @description renders the component
   * @returns jsx containing the component/routes
   */
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListShelves
              books={this.state.books}
              onChangeBookShelf={this.updateBookShelf}
              onChangeBookRating={this.updateBookRating}
              loading={this.state.loading}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              onSearch={this.getSearchResults}
              searchResults={this.state.searchResults}
              onChangeBookShelf={this.updateBookShelf}
              loading={this.state.loading}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
