import { ButtonContainer, Icon } from './ScrollToTop.styled';
import { useState, useEffect } from 'react';

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <ButtonContainer>
      {showTopBtn && <Icon onClick={goToTop} />}
    </ButtonContainer>
  );
};
