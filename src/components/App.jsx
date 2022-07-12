import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

const KEY = '27626475-8422ee6256ea07f97d3a4bc44';
class App extends Component {
  state = { searchQuery: '' };
  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  componentDidMount() {
    // `https://pixabay.com/api/?q=cat&page=1&key=${KEY}_type=photo&orientation=horizontal&per_page=12`;
    fetch(
      `https://pixabay.com/api/?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => res.json())
      .then(console.log);
  }
  render() {
    return (
      <Container>
        <Searchbar onSubmitForm={this.handleSubmit} />
        <ImageGallery />
        <ToastContainer autoClose={4000} />
      </Container>
    );
  }
}

export default App;
