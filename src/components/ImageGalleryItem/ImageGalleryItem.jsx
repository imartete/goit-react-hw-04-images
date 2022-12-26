import PropTypes from 'prop-types';
import 'styles.css';

export const ImageGalleryItem = ({ src, alt, onClick, modalImage }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={alt}
        onClick={() => {
          onClick({ alt, modalImage });
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
};
