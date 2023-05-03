import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4d87a9"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};
