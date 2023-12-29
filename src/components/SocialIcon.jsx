import { PropTypes } from 'prop-types';
import React, { useContext, useState } from 'react';
import { SocialIcon as Icon } from 'react-social-icons';
import styled, { ThemeContext } from 'styled-components';

const styles = {
  iconStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
};

const StyledIcon = styled(Icon)`
border: 1px solid #fff;
border-radius: 50%;
background: white;
&:hover {
    border-radius: 50%;
    background: white;
}
`;

const SocialIcon = ({ social }) => {
  const theme = useContext(ThemeContext);
  const [hover, setHover] = useState(false);
  return (
    <StyledIcon
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      key={social.network}
      style={styles.iconStyle}
      url={social.href}
      network={social.network}
      bgColor={hover ? '#149ddd' : theme.socialIconBgColor}
      color="#fff"
      target="_blank"
      rel="noopener"
    />
  );
};

SocialIcon.propTypes = {
  social: PropTypes.shape({
    network: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};

export default SocialIcon;
