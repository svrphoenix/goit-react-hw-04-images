import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ThreeDots as Loader } from 'react-loader-spinner';
import { readPixabayImages, ITEMS_PER_PAGE } from 'services/pixabay-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Layout } from './Layout/Layout';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';

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

    const loadImages = async () => {
      setIsLoading(true);
      try {
        const results = await readPixabayImages(query, page);
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
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        const isPagination = total > page * ITEMS_PER_PAGE;
        setImages(prevState => [...prevState, ...images]);
        setIsLoadMore(isPagination);
      } catch (error) {
        toast.error('Error happened on server. Please, reload webpage.');
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [page, query]);

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && (
        <Loader
          height="80"
          width="80"
          radius="9"
          color="#4d87a9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      )}
      {!isLoading && isloadMore && (
        <Button
          onClick={() => {
            setPage(state => state + 1);
          }}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
      <GlobalStyle />
    </Layout>
  );
};
