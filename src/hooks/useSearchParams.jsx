import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

function useSearchParams() {
  const location = useLocation();
  const { search } = location;
  return useMemo(
    () => new URLSearchParams(search).get('page'),
    [search],
  );
}

export default useSearchParams;
