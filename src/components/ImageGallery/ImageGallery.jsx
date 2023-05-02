import PropTypes from 'prop-types';
// import { useEffect, useRef } from 'react';
import { useEffect } from 'react';
import { List } from 'components/ImageGallery/ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  // const isMounted = useRef(false);

  useEffect(() => {
    // console.log('Effect:', new Date(), isMounted.current);
    // if (isMounted.current) {
    const bodyHeight = document.body.getBoundingClientRect().height;
    window.scrollTo({ top: bodyHeight, behavior: 'smooth' });
    // }
    // return () => {
    //   isMounted.current = true;
    // };
  });

  return (
    <List>
      {images.map(item => (
        <li key={item.id}>
          <ImageGalleryItem item={item} />
        </li>
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
