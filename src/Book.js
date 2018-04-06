import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  state = {
    defaultBookCover: 'http://books.google.com/books/content?printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  }

  render() {
    return (
      <div className="book" id={this.props.id}>
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128, height: 188, backgroundImage: `url("${this.props.bookCover || this.state.defaultBookCover}")` }}>
          </div>
          <BookShelfChanger
            id={`shelf_${this.props.id}`}
            value={this.props.shelf}
            onShelfChange={(newShelf) => this.props.onShelfChange(newShelf)}
            />
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">
          {
            (this.props.authors && this.props.authors.length > 0)
              ? this.props.authors.map(author => author)
              : 'No authors identified.'
          }
        </div>
      </div>
    )
  }
}

export default Book
