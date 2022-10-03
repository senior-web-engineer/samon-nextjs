import { createContext } from 'react';
interface IFloatContext {
  showFloater?: boolean;
  toggleFloater?: (option: boolean) => void;
}
const FloatContext = createContext<IFloatContext>({});
export default FloatContext;
