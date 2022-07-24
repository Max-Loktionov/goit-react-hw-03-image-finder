import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import * as Scroll from 'react-scroll';
import { animateScroll as scroll } from 'react-scroll';
import style from './app.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import API from 'services/API';
import Loader from './Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    page: 1,
    error: null,
    status: Status.IDLE,
  };
  handleSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };
  // scroll = Scroll.animateScroll.scrollTo(100, {
  //   duration: 1500,
  //   delay: 100,
  //   smooth: true,
  //   // offset: 50,
  // });

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery) {
      this.setState({ page: 1, gallery: [] });
    }
    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.setState({ status: Status.PENDING });

      try {
        const gallery = await API.getGallery(newQuery, newPage);
        scroll.scrollToBottom({
          smooth: true,
          offset: 100,
          duration: 2000,
          delay: 300,
        });
        if (gallery.total === 0) {
          return this.setState({
            error: `Not found ${newQuery}`,
            status: Status.REJECTED,
          });
        } else {
          return this.setState(prevState => ({
            gallery: [...prevState.gallery, ...gallery.hits],
            status: Status.RESOLVED,
          }));
        }
      } catch (error) {
        this.setState({ error, status: Status.REJECTED });
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

    if (status === Status.IDLE) {
      return (
        <div>
          <Searchbar onSubmitForm={this.handleSubmit} />
          <ToastContainer />
        </div>
      );
    }

    if (status === Status.PENDING) {
      return (
        <div className={style.app}>
          <Searchbar onSubmitForm={this.handleSubmit} />
          <ToastContainer />
          <ImageGallery gallery={gallery}></ImageGallery>
          <Loader />
          <Button onClick={this.loadMoreBtn}>Load more...</Button>
        </div>
      );
    }

    if (status === Status.RESOLVED) {
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
    if (status === Status.REJECTED) {
      return (
        <div>
          <Searchbar onSubmitForm={this.handleSubmit} />
          <h1>{error}</h1>
          <ToastContainer />
        </div>
      );
    }
  }
}

export default App;
