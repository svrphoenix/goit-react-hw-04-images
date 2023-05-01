import PropTypes from 'prop-types';
import { CloseButton, Img } from './Modal.styled';
import ReactModal from 'react-modal';

const customStyles = {
  overlay: {
    zIndex: 998,
  },
  content: {
    zIndex: 999,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

export const Modal = ({ isOpen, url, alt, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Selected image modal"
    >
      <div>
        <Img src={url} alt={alt} />
        <CloseButton type="button" onClick={onClose}>
          Close
        </CloseButton>
      </div>
    </ReactModal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
