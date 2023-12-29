import React from 'react';
import PropTypes from 'prop-types';

function Header(props) {
  const { title, headerClassName } = props;
  return <div className={headerClassName}>{title}</div>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  headerClassName: PropTypes.string,
};

Header.defaultProps = {
  headerClassName: '',
};

export default Header;
