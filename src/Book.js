import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired
  }

  render() {
    const { title, authors, bookCover } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{ width: 128, height: 188, backgroundImage: `url("${bookCover}")` }}>
          </div>
          <BookShelfChanger />
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default Book
