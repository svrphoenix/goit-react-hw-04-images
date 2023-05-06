import { ButtonContainer, Icon } from './ScrollToTop.styled';
import { useState, useEffect } from 'react';

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  return (
    <ButtonContainer>
      {showTopBtn && <Icon onClick={handleScrollToTop} />}
    </ButtonContainer>
  );
};
