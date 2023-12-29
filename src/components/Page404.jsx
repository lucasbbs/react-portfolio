import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

function Page404(props) {
  const { header } = props;
  return (
    <Header
      headerClassName="header"
      title={header}
    />
  );
}

Page404.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Page404;
