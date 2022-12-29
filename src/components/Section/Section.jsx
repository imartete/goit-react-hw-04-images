import PropTypes from 'prop-types';
import './Section.modules.css';

export const Section = ({ children, title = 'title' }) => {
  return (
    <section className="section">
      <h1 className="visually-hidden">{title}</h1>
      <div className="container">{children}</div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
