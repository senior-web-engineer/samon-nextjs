import parse from 'html-react-parser';
interface RedboxProps {
  data: any;
}

const Redbox = ({ data }: RedboxProps) => {
  if (!data || !data.title || !data.text) {
    return null;
  }

  return (
    <>
      <div className='mb-10 text-center bg-brand-red contain'>
        <div className='p-10 text-center text-white contain'>
          <h3 className='mb-3 text-center'>{data.title}</h3>
          {data?.text && parse(data?.text)}
        </div>
      </div>
    </>
  );
};

export default Redbox;
