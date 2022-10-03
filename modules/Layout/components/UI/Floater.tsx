import FloatContext from '@modules/Layout/context/FloatContext';
import { motion } from 'framer-motion';
import { useContext } from 'react';
const button = {
  visible: {
    opacity: 1,
    x: '0%',
    y: '0%',
  },
  hidden: {
    opacity: 0,
    x: '100%',
    y: '100%',
  },
};
const Floater = () => {
  const { showFloater } = useContext(FloatContext);

  return (
    <motion.a
      animate={showFloater ? 'visible' : 'hidden'}
      initial={{ opacity: 0 }}
      variants={button}
      className='fixed z-[999] py-3 text-xs leading-none text-center text-white uppercase transition-all rounded-full cursor-pointer lg:text-base px-7 bottom-5 right-5 lg:bottom-10 lg:right-10 bg-brand-red hover:ring-4 ring-brand-red/20'
      onClick={(e) => {
        let cta = document.getElementById('footer-cta');
        e.preventDefault();
        cta && cta.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      <strong className='font-bold leading-none font-display'>
        Questions?
      </strong>
      <p className='text-xs leading-none'>Contact us</p>
    </motion.a>
  );
};
export default Floater;
