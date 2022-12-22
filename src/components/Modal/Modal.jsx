import React from 'react';
import PropTypes from 'prop-types';
import 'styles.css';

export class Modal extends React.Component {
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.handleClose();
    }
  };

  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    pictureArr: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
      }).isRequired
    ).isRequired,
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.handleClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          {this.props.pictureArr.map(picture => (
            <img
              key={picture.id}
              src={picture.largeImageURL}
              alt={picture.tags}
            />
          ))}
        </div>
      </div>
    );
  }
}
