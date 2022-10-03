import { useState } from 'react';

const useFloater = () => {
  const [show, setShow] = useState(true);

  const toggleFloater = (option: boolean) => {
    if (!option) {
      setShow(!show);
      return;
    }
    setShow(option);
    return;
  };

  return { showFloater: show, toggleFloater };
};
export default useFloater;
