import React from 'react';

import PropTypes from 'prop-types';
import apiserver from '../libs/apiserver';
import { connect } from 'react-redux';
import { updateUser } from '../actions/user';
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const file = '/src/containers/LoginNavItemContainer';

const profileImage = url => (
  <img className="thumbnail-image" src={url} />
);

const LoginNavItemContainer = ({ user, onClickLogout }) => {
  console.log({ file, func: 'LoginNavItemContainer', user });

  if (user.id) {
    return (
      <NavDropdown eventKey={1} title={ profileImage(user.pictureUrl) } id="basic-nav-dropdown">
        <MenuItem eventKey={1.1}></MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={1.2} href="#" onClick={(e) => {
          e.preventDefault();
          onClickLogout();
        }}>
          Sign out
        </MenuItem>
      </NavDropdown>
    );
  }

  return (
    <NavItem href="/signinup">
      Sign in / Register
    </NavItem>
  );
};

LoginNavItemContainer.propTypes = {
  user: PropTypes.object.isRequired,
  onClickLogout: PropTypes.func.isRequired,
};

const signout = () => async (dispatch) => {
  await apiserver.signout();

  dispatch(updateUser({
    id: undefined,
  }));
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => {
    dispatch(signout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginNavItemContainer);
