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
