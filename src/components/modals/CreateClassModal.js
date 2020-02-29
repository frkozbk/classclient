import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { createClass } from '../../actions/classActions';

import '../../styles/joinClassModal.scss';

const JoinClassModal = ({ isOpen, onClose }) => {
  const [className, setClassName] = useState('');
  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader>Sınıf Oluştur</ModalHeader>
        <ModalBody>
          <div className="createClassModal">
            <p>Lütfen oluşturmak istediğiniz sınıfın ismini giriniz?</p>
            <input
              name="className"
              type="text"
              placeholder="Sınıf İsmi"
              value={className}
              onChange={e => setClassName(e.target.value)}
            />
            <Button block onClick={() => createClass(className)}>
              Sınıfa Katıl
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default connect(null, { createClassFn: createClass })(JoinClassModal);
