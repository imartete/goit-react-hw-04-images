import PropTypes from 'prop-types';
import 'styles.css';

export const ImageGalleryItem = ({ id, src, alt, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={alt}
        onClick={() => {
          onClick(id);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
