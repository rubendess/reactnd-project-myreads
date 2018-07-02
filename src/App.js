import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'
import Loader from './Loader'
import './App.css'

class BooksApp extends React.Component {
  state = {
    isFetching: false,
    shelfList: [
      {
        id: 'currentlyReading',
        title: 'Currently Reading'
      },
      {
        id: 'wantToRead',
        title: 'Want to Read'
      },
      {
        id: 'read',
        title: 'Read'
      }
    ],
    books: [],
    booksSearch: []
  }

  componentDidMount() {
    this.getAllBooks();
  }

  setIsFetching = (isFetching) => {
    this.setState({ isFetching })
  }

  getShelf = (book) => {
    if(this.state.books && this.state.books.length > 0) {
      const bookFilteredFromShelf = this.state.books.filter(b => b.id === book.id)
      return bookFilteredFromShelf && bookFilteredFromShelf.length > 0 ? bookFilteredFromShelf[0].shelf : 'none'
    }

    return 'none'
  }

  getAllBooks = () => {
    this.setIsFetching(true)
    BooksAPI.getAll().then((books) => {
      this.setState({ books, isFetching: false })
    }).catch((err) => {
      this.setState({ books: [], isFetching: false })
      alert('Error on loading the books. Please, try again.')
    })
  }

  searchBooksInAPI = (e) => {
    const query = e.target.value

    if(query && query.trim() !== '') {
      BooksAPI.search(query).then((books) => {
        this.setState({ query, booksSearch: books })
      })
    } else {
        this.setState({ query, booksSearch: [] })
    }
  }

  changeBookShelf = (book, newShelf) => {
    this.setIsFetching(true)
    BooksAPI.update(book, newShelf).then((result) => {
      let newBook = book
      newBook.shelf = newShelf
      const newBookList = this.state.books
      const bookInList = this.state.books.filter(b => b.id === book.id)
      newBookList.splice(this.state.books.indexOf(bookInList[0]), 1, book)
      this.setState({ books: newBookList, isFetching: false })
    }).catch((err) => {
      this.setState({ isFetching: false })
      alert('Error on changing the shelf. Please, try again.')
    })
  }

  render() {

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" href='/'>Close</a>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={ (event) => this.searchBooksInAPI(event) }/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {
                this.state.isFetching ?
                  <Loader />
                  :
                  (this.state.booksSearch && this.state.booksSearch.length > 0) ? this.state.booksSearch.map(book =>
                    <Book
                      key={book.id}
                      id={`book_${book.id}`}
                      title={book.title}
                      authors={book.authors}
                      bookCover={book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : null}
                      shelf={ this.getShelf(book) }
                      onShelfChange={(newShelf) => this.changeBookShelf(book, newShelf)}
                      />
                  ) : (this.state.query) ? 'No books found' : ''
                }
              </ol>
            </div>
          </div>
        )} />
        <Route exact path='/' render={({ history }) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            {
               this.state.isFetching ?
                 <Loader />
               : (
                    <div>
                    {
                        this.state.shelfList.map(shelf =>
                          <BookShelf
                            key={shelf.id}
                            title={shelf.title}
                            books={this.state.books.filter(book => book.shelf === shelf.id)}
                            onShelfChange={this.changeBookShelf}
                          />
                        )
                    }
                    </div>
                  )
            }
            </div>
            <div className="open-search">
              <a href='/search'>Add a book</a>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
