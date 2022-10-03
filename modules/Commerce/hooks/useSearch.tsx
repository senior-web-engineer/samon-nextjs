import { useEffect, useState } from 'react';

const useSearch = () => {
  const [searchString, setSearchString] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  return {
    value: searchString,
    update: setSearchString,
    open: searchOpen,
    toggle: toggleSearch,
  };
};

export default useSearch;
