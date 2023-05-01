import { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ item }) => {
  const { largeImageURL, webformatURL, tags } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = e => {
    e.preventDefault();
    setIsModalOpen(true);
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    document.body.style.height = 'initial';
    setIsModalOpen(false);
  };

  return (
    <Item>
      <a href={largeImageURL} onClick={openModal}>
        <Image src={webformatURL} alt={tags} />
      </a>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        url={largeImageURL}
        alt={tags}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
