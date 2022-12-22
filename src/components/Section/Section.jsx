import PropTypes from 'prop-types';
import './Section.modules.css';

export const Section = ({ children }) => {
  return (
    <section className="section">
      <div className="container">{children}</div>
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};
