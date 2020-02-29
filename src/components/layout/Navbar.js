import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JoinClassModal from '../modals/JoinClassModal';

import { logoutUser } from '../../actions/authActions';
import image from '../../styles/Logo1.png';
import '../../styles/navbar-logged.scss';
import CreateClassModal from '../modals/CreateClassModal';
import NavbarTeacher from './NavbarTeacher';
import NavbarStudent from './NavbarStudent';
import { createClass } from '../../actions/classActions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createClassModalIsOpen: false,
      joinClassModalIsOpen: false
    };
  }

  handleLogout = e => {
    const { logoutUserFn, history } = this.props;
    e.preventDefault();
    logoutUserFn(history);
  };

  renderNavbar = () => {
    const { authInfo } = this.props;
    const { isAuthenticated } = authInfo;
    const isTeacher = authInfo.user && authInfo.user.isteacher;
    if (isAuthenticated) {
      if (isTeacher) {
        return (
          <NavbarTeacher
            openCreateClassModal={() =>
              this.setState({ createClassModalIsOpen: true })
            }
            image={image}
            handleLogout={() => this.handleLogout()}
          />
        );
      }
      return (
        <NavbarStudent
          openJoinClassModal={() =>
            this.setState({ joinClassModalIsOpen: true })
          }
          image={image}
          handleLogout={() => this.handleLogout()}
        />
      );
    }
    return <Navbar image={image} />;
  };

  render() {
    const { joinClassModalIsOpen, createClassModalIsOpen } = this.state;
    return (
      <>
        {this.renderNavbar()}
        <JoinClassModal
          isOpen={joinClassModalIsOpen}
          onClose={() => this.setState({ joinClassModalIsOpen: false })}
        />
        <CreateClassModal
          isOpen={createClassModalIsOpen}
          onClose={() => this.setState({ createClassModalIsOpen: false })}
        />
      </>
    );
  }
}
const mapStateToProps = state => ({
  authInfo: state.auth
});
export default connect(mapStateToProps, {
  logoutUserFn: logoutUser,
  createClassFn: createClass
})(withRouter(Navbar));
