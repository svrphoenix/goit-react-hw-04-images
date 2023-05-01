import PropTypes from 'prop-types';

import { MoreButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <MoreButton type="button" onClick={onClick}>
      Load more
    </MoreButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
