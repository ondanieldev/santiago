import React, { useEffect, useState } from 'react';

import { Container, Button } from './styles';

interface IProps {
  pagesNumber: number;
  activePage: number;
  changePageEffect(page: number): void;
}

const Pagination: React.FC<IProps> = ({
  pagesNumber,
  activePage,
  changePageEffect,
}) => {
  const [pages, setPages] = useState([] as number[]);

  useEffect(() => {
    const newPages = [];

    for (let i = 1; i <= pagesNumber; ++i) {
      newPages.push(i);
    }

    setPages(newPages);
  }, [pagesNumber]);

  return (
    <Container className="pagination">
      {pages.map(page => (
        <Button
          key={page}
          type="button"
          onClick={() => changePageEffect(page)}
          isActive={page === activePage}
        >
          {page}
        </Button>
      ))}
    </Container>
  );
};

export default Pagination;
