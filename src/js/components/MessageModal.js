import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@johnshopkins/huddle-puzzle/modal';

const MessageModal = ({ children, onClose, message, open }) => {
  return (
    <Modal classes={['message']} onClose={onClose} open={open}>
      <div className={'message'}>
        {message.map((paragraph, i) => <p key={i} dangerouslySetInnerHTML={{__html: paragraph}} />)}
      </div>
      <div className={'modal-nav'}>
        {children}
      </div>
    </Modal>
  )
};

MessageModal.defaultProps = {
  testing: false,
};

MessageModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  testing: PropTypes.bool,
};

export default MessageModal;
