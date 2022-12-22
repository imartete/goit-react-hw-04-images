import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, getId }) => {
  return (
    <ul>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          id={image.id}
          src={image.webformatURL}
          alt={image.tags}
          onClick={getId}
        />
      ))}
    </ul>
  );
};
