import { PropTypes } from 'prop-types';
import React, { useState } from 'react';

const ScrollButton = ({ color }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      className="scroll-top-button"
      type="button"
      onClick={scrollToTop}
      style={{
        display: visible ? 'block' : 'none',
        position: 'fixed',
        right: 0,
        margin: 20,
        bottom: '40px',
        height: '20px',
        fontSize: '3rem',
        zIndex: 1,
        cursor: 'pointer',
        color,
        backgroundColor: 'transparent',
        border: 'none',
      }}
    >
      <i className="fa-solid fa-circle-arrow-up" />
    </button>
  );
};

ScrollButton.propTypes = {
  color: PropTypes.string,
};

ScrollButton.defaultProps = {
  color: '#149ddd',
};

export default ScrollButton;
