import React, { Component } from 'react'

class BookShelfChanger extends Component {
  constructor(props) {
    super(props);

    this.state = { value: this.props.value || 'moveTo'};
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    })

    this.props.onShelfChange(e.target.value)
  }

  render() {

    return (
      <div className="book-shelf-changer">
        <select
          id={this.props.id}
          value={this.state.value}
          onChange={(e) => this.onChange(e)}>
            <option value="moveTo" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookShelfChanger
