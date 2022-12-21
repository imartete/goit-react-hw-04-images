import React from 'react';
import PropTypes from 'prop-types';

export default class Searchbar extends React.Component {
  state = {
    searchQuery: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    event.currentTarget.reset();
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

// Searchbar.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
