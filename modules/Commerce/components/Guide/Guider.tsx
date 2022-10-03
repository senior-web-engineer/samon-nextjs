import { motion } from 'framer-motion';
const container = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
export default function Guider({ open }) {
  return (
    <motion.div
      variants={container}
      className={`border-t pt-5 border-white/20 py-5 px-10`}
      initial='exit'
      animate={open ? 'enter' : 'exit'}
      exit='exit'
    >
      Guide content here
    </motion.div>
  );
}
