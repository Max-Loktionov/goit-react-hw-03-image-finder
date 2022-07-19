import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';

import style from './ImageGallery.module.css';

function ImageGallery({ gallery }) {
  return (
    <div>
      <ul className={style.gallery}>
        {gallery &&
          gallery.map(item => {
            return (
              <ImageGalleryItem
                url={item.webformatURL}
                urlLargeImg={item.largeImageURL}
                id={item.id}
                key={item.id}
                tags={item.tags}
              />
            );
          })}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      urlLargeImg: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
