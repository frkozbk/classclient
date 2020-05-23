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

import MathJaxPreview from '../common/MathJaxPreview';
import instance from '../../instance';

const CreatePostModal = ({ isOpen, handleClose, classroomId }) => {
  const [content, setContent] = React.useState('');
  const [showPreview, setShowPreview] = React.useState(false);
  const [createPostState, setCreatePostState] = React.useState('');
  const handleToggle = () => {
    setContent('');
    handleClose();
  };
  const handleCreatePost = e => {
    e.preventDefault();
    setCreatePostState('loading');
    instance.post(`/api/post/create/${classroomId}`, { content }).then(() => {
      handleToggle();
    });
  };
  return (
    <Modal isOpen={isOpen} toggle={handleToggle}>
      <ModalHeader>Bir Gönderi Oluştur</ModalHeader>
      <ModalBody>
        <Form onSubmit={e => handleCreatePost(e)}>
          <MathJaxPreview value={content} isHidden={!showPreview} />
          {!showPreview && (
            <Input
              type="textarea"
              value={content}
              style={{ minHeight: 400 }}
              onChange={e => setContent(e.target.value)}
            />
          )}
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              type="button"
              color="info"
              onClick={() => setShowPreview(prevState => !prevState)}
              style={{
                marginRight: 10
              }}
            >
              {!showPreview ? 'Önizlemeyi Aç' : 'Önizlemeyi Kapat'}
            </Button>
            <Button color="success">
              {createPostState === 'loading' ? (
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

export default CreatePostModal;
