import React from 'react';
import PropTypes from 'prop-types';
import 'styles.css';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.handleClose();
    }
  };

  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    pictureObj: PropTypes.shape({
      alt: PropTypes.string.isRequired,
      modalImage: PropTypes.string.isRequired,
    }).isRequired,
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.handleClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img
            src={this.props.pictureObj.modalImage}
            alt={this.props.pictureObj.alt}
          />
        </div>
      </div>
    );
  }
}
