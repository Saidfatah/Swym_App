import PropTypes from 'prop-types';

const UserAccountShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.number,
  // balance: PropTypes.number.isRequired,
  withdrawalAddress: PropTypes.string,
});

export default UserAccountShape;
