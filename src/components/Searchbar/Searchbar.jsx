import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      toast.info('please, type a request');
      return;
    }
    this.props.onSubmitForm(this.state.query);
    this.setState({ query: '' });
  };
  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({ query: value.toLowerCase() });
  };
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            value={this.state.query}
            onChange={this.handleChange}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
