import parse from 'html-react-parser';
const Intro = ({ heading, body }) => {
  return (
    <div className='max-w-xl mx-auto text-center contain row'>
      <h1 className='mb-2'>{heading}</h1>
      <div>{body}</div>
    </div>
  );
};
export default Intro;
