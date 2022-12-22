import PropTypes from 'prop-types';
import 'styles.css';

export const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="Button">
      Load more
    </button>
  );
};
