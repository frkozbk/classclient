import React, { Component } from 'react';
import '../../styles/class.scss';
import { connect } from 'react-redux';
import { getUserClass } from '../../actions/getUserClass';
import { ClassroomCard } from './ClassroomCard';

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getUserClassFn } = this.props;
    getUserClassFn();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user_class: nextProps.user_class.classes });
  }

  render() {
    let content;
    if (this.state.user_class) {
      content = this.state.user_class.map(iter => {
        return (
          <li>
            <ClassroomCard
              name={iter.name}
              id={iter.id}
              avatar={iter.avatar}
              teacherName="Özgür Can Turna"
            />
          </li>
        );
      });
    }
    return (
      <section className="class_section">
        <ul>{content}</ul>
      </section>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  user_class: state.user_class
});
export default connect(mapStateToProps, { getUserClassFn: getUserClass })(
  Classroom
);
