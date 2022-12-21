import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, src, alt }) => {
  return (
    <li>
      <img src={src} alt={alt} />
    </li>
  );
};
