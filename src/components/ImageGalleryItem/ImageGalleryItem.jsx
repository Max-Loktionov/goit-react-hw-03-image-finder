import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import style from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    data: {},
    isModalOpen: false,
  };
  openModal = data => {
    this.setState({ isModalOpen: true, data: data });
  };

  toggleModal = () =>
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));

  render() {
    const { id, url, tags, urlLargeImg } = this.props;
    const { isModalOpen } = this.state;
    return (
      <li key={id} className={style.item}>
        <img
          src={url}
          alt={tags}
          className={style.image}
          onClick={() => this.openModal(this.props)}
        />
        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img src={urlLargeImg} alt={tags} />
          </Modal>
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  urlLargeImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
