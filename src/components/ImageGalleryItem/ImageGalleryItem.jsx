import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, src, alt, onClick }) => {
  return (
    <li>
      <img
        src={src}
        alt={alt}
        onClick={() => {
          onClick(id);
        }}
      />
    </li>
  );
};
