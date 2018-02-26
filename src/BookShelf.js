import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    const { books, title } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              (books && books.length > 0) ? books.map(book =>
                <Book
                  key={book.id}
                  id={`book_${book.id}`}
                  title={book.title}
                  authors={book.authors}
                  bookCover={book.imageLinks.thumbnail}
                  shelf={book.shelf}
                  onShelfChange={(newShelf) => this.props.onShelfChange(book, newShelf)}
                  />
              ) : 'No books on this shelf'
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
