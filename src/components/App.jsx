import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { readPixabayImages, ITEMS_PER_PAGE } from 'services/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { Loader } from './Loader/Loader';
import { ScrollToTop } from './ScrollToTop/ScrollToTop';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isloadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = ({ searchQuery }) => {
    if (searchQuery === query && page === 1) return;
    setQuery(searchQuery.trim());
    setImages([]);
    setPage(1);
    setIsLoadMore(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const controller = new AbortController();

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const results = await readPixabayImages(query, page, controller);
        const images = results.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );
        const total = results.totalHits;

        if (total === 0) {
          toast(
            'Sorry, there are no images matching your search query. Please try again.',
            { icon: '😒' }
          );
          return;
        }

        const isPagination = total > page * ITEMS_PER_PAGE;
        setImages(prevImages => [...prevImages, ...images]);
        setIsLoadMore(isPagination);
      } catch (error) {
        toast('Error happened on server. Please, reload webpage.', {
          icon: '⛔',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
    return () => {
      controller.abort();
    };
  }, [page, query]);

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {!isLoading && isloadMore && (
        <Button
          onClick={() => {
            setPage(prevPage => prevPage + 1);
          }}
        />
      )}
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <GlobalStyle />
    </Layout>
  );
};
