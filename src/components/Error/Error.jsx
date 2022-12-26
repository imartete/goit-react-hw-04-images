import PropTypes from 'prop-types';
import './Error.modules.css';

export const Error = ({ message }) => {
  return (
    <div>
      <p className="error_text">{message ? message : 'ERROR'}</p>
      <div className="error_placeholder"></div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
