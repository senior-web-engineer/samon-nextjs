import { createContext } from 'react';

interface SearchContextInterface {
  value: string;
  open: boolean;
  update: (input: string) => void;
  toggle: () => void;
}

const SearchContext = createContext<Partial<SearchContextInterface>>({});
export default SearchContext;
