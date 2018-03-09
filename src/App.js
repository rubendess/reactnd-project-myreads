import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'
import Loader from './Loader'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    isFetching: false,
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
      console.log("get Shelf", book, this.state.books, bookFilteredFromShelf);
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={ (event) => this.searchBooksInAPI(event) }/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  (this.state.booksSearch && this.state.booksSearch.length > 0) ? this.state.booksSearch.map(book =>
                    <Book
                      key={book.id}
                      id={`book_${book.id}`}
                      title={book.title}
                      authors={book.authors}
                      bookCover={book.imageLinks.thumbnail}
                      shelf={ this.getShelf(book) }
                      onShelfChange={(newShelf) => this.changeBookShelf(book, newShelf)}
                      />
                  ) : (this.state.query) ? 'No books found' : ''
                }
              </ol>
            </div>
          </div>
        ) : (
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
                    <BookShelf
                      title='Currently Reading'
                      books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                      onShelfChange={this.changeBookShelf}
                    />
                    <BookShelf
                      title='Want to Read'
                      books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                      onShelfChange={this.changeBookShelf}
                    />
                    <BookShelf
                      title='Read'
                      books={this.state.books.filter(book => book.shelf === 'read')}
                      onShelfChange={this.changeBookShelf}
                    />
                  </div>
                )
              }
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
