import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    margin: 5px;
    padding: 0.375rem 0.75rem;
    border: 1px solid #149ddd;
    color: #149ddd;
    text-decoration: none;
    border-radius: 6px;
    &:hover,&:focus-within {
      color: #000000;
      background-color: #149ddd;
      border-color: #149ddd;
    }
`;

const Pagination = (props) => {
  const {
    urls: {
      first, last, prev, next,
    },
  } = props;
  // eslint-disable-next-line react/destructuring-assignment
  return (
    <div style={{ zIndex: 9, marginBottom: '1rem' }}>
      {first && (
      <StyledLink title="first" to={first}>
        <i className="fa-solid fa-backward" />
      </StyledLink>
      )}
      {prev && (
      <StyledLink title="previous" to={prev}>
        <i className="fa-solid fa-caret-left" />
      </StyledLink>
      )}
      {next && (
      <StyledLink title="next" to={next}>
        <i className="fa-solid fa-caret-right" />
      </StyledLink>
      )}
      {last && (
      <StyledLink title="last" to={last}>
        <i className="fa-solid fa-forward" />
      </StyledLink>
      )}
    </div>
  );
};

Pagination.propTypes = {
  urls: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    next: PropTypes.string,
    prev: PropTypes.string,
  }).isRequired,
};

export default Pagination;
