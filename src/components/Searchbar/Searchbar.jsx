import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import style from './searchBar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      return toast.warn('🦄 please, type a request', {
        autoClose: 3000,
        theme: 'dark',
      });
    }
    this.props.onSubmitForm(this.state.query);

    this.setState({ query: '' });
  };
  handleChange = event => {
    const { value } = event.currentTarget;
    return this.setState({ query: value.toLowerCase() });
  };
  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.button}>
            <AiOutlineSearch color={'navy'} size={40} />
            <span className={style.button_label}></span>
          </button>

          <input
            value={this.state.query}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={style.searchForm_input}
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
