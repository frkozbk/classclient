import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Form,
  Button,
  Spinner
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { setDefaultLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/CreateTaskModal.scss';
import instance from '../../instance';

setDefaultLocale(tr);

const CreateTaskModal = ({ isOpen, handleClose, classroomId }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [endDate, setEndDate] = React.useState(null);
  const [createTaskState, setCreateTaskState] = React.useState('');
  const handleToggle = () => {
    handleClose();
  };
  const handleCreateTask = e => {
    e.preventDefault();
    setCreateTaskState('loading');
    instance
      .post(`/api/tasks/create`, { title, content, endDate, classroomId })
      .then(() => {
        setCreateTaskState('success');
        handleToggle();
      });
  };
  const isButtonDisabled = () => {
    return content.length === 0 || title.length === 0 || endDate === null;
  };
  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader>Bir Ödev Oluştur</ModalHeader>
      <ModalBody>
        <Form onSubmit={e => handleCreateTask(e)}>
          <Input
            type="text"
            value={title}
            placeholder="Ödev Başlığı"
            style={{ marginBottom: '20px' }}
            onChange={e => setTitle(e.target.value)}
          />
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            placeholderText="Bitiş Tarihini Seçin"
          />
          <Input
            type="textarea"
            placeholder="Ödevin Açıklaması..."
            value={content}
            style={{ minHeight: '300px', marginTop: '20px' }}
            onChange={e => setContent(e.target.value)}
          />
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button color="success" disabled={isButtonDisabled}>
              {createTaskState === 'loading' ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                'Oluştur'
              )}
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CreateTaskModal;
