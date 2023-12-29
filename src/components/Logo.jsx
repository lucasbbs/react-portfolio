import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';

const logoStyle = {
  width: 50,
  height: 40,
};

const Logo = ({ data }) => {
  const [hover, setHover] = useState(false);
  return (
    <Navbar.Brand
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      href="/"
      style={{
        display: 'flex',
      }}
    >
      <img
        src={data?.logo?.source}
        className="d-inline-block align-top"
        alt="main logo"
        style={
        data?.logo?.height && data?.logo?.width ? {
          height: data?.logo?.height,
          width: data?.logo?.width,
          filter: hover ? 'invert(56%) sepia(42%) saturate(3104%) hue-rotate(167deg) brightness(89%) contrast(94%)' : 'none',
        }
          : logoStyle
}
      />
      {' '}
      <span style={{ alignSelf: 'center', marginLeft: 5 }}>
        Lucas&apos; Portfolio
      </span>
    </Navbar.Brand>
  );
};
Logo.propTypes = {
  data: PropTypes.shape({
    logo: PropTypes.shape({
      source: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Logo;
