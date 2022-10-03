import { AnimatePresence } from 'framer-motion';
import Guider from './Guider';
import { useState } from 'react';

export default function Guide() {
  const [open, setOpen] = useState(false);
  return (
    <div className='pt-0 text-white rounded contain bg-brand-red'>
      <div className={`flex items-center justify-between px-10 py-5`}>
        <p>Need som guidance?</p>
        <button
          onClick={() => setOpen(!open)}
          className='px-5 py-2 border-2 border-white rounded-full '
        >
          {open ? 'Close' : 'Get started'}
        </button>
      </div>
      <AnimatePresence>{open && <Guider open={open} />}</AnimatePresence>
    </div>
  );
}
