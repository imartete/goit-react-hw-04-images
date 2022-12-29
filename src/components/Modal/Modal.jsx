import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'styles.css';

export function Modal({ handleClose, pictureObj }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        handleClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  function handleOverlayClick(event) {
    if (event.currentTarget === event.target) {
      handleClose();
    }
  }

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={pictureObj.modalImage} alt={pictureObj.alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  pictureObj: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    modalImage: PropTypes.string.isRequired,
  }).isRequired,
};
