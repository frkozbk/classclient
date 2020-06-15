import React, { Component, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import dayjs from 'dayjs';
import '../styles/class.scss';
import { getUserClass } from '../actions/getUserClass';
import instance from '../instance';

const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  useEffect(() => {
    instance.get(`/api/tasks/`).then(({ data: { tasks: newTaks } }) => {
      setTasks(newTaks);
    });
  }, []);
  return (
    <section className="class_section">
      {/* <ul>{content}</ul> */}
      <Table>
        <thead>
          <tr>
            <th>Ödev'in Başlığı</th>
            <th>Bitiş Tarihi</th>
            <th>Açıklaması</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            return (
              <tr key={task.content}>
                <td>{task.title}</td>
                <td>{dayjs(task.endDate).format('DD MMMM YYYY')}</td>
                <td>{task.content}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </section>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  classes: state.user_class.classes
});
const mapDispatchToProps = dispatch => ({
  getUserClassFn: bindActionCreators(getUserClass, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
