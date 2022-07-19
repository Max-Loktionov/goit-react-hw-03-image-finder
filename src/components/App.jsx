import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import style from './app.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import API from 'services/API';
import Loader from './Loader';

class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    error: null,
    status: 'idle',
  };
  handleSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };
  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery) {
      this.setState({ page: 1, gallery: [] });
    }
    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.setState({ status: 'pending' });

      try {
        const gallery = await API.getGallery(newQuery, newPage);

        if (gallery.total === 0) {
          return this.setState({
            error: `Not found ${newQuery}`,
            status: 'rejected',
          });
        } else {
          return this.setState(prevState => ({
            gallery: [...prevState.gallery, ...gallery.hits],
            status: 'resolved',
          }));
        }
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { error, status, gallery } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <Searchbar onSubmitForm={this.handleSubmit} />
          <ToastContainer />
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmitForm={this.handleSubmit} />
          <ToastContainer />
          <Loader />
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmitForm={this.handleSubmit} />
          <h1>{error}</h1>
          <ToastContainer />
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={style.app}>
          <Searchbar onSubmitForm={this.handleSubmit} />
          <ToastContainer />
          <ImageGallery gallery={gallery}></ImageGallery>
          <Button onClick={this.loadMoreBtn}>Load more...</Button>
          <ToastContainer />
        </div>
      );
    }
  }
}

export default App;
