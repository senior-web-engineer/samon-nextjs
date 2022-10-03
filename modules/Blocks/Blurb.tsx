import Image from 'next/image';
interface BlurbProps {
  data: any;
}

const Blurb = ({ data }: BlurbProps) => {
  //('BLURB =>', data);
  const orientation = () => {
    switch (data.orientation) {
      case 'Left':
        return 'items-start text-left';
      case 'Center':
        return 'items-center text-center';
      case 'Right':
        return 'items-end text-right';
    }
  };
  return (
    <div className={`flex flex-col whitespace-pre-wrap ${orientation()}`}>
      {data?.image?.mediaItemUrl && (
        <figure className='relative w-16 h-16'>
          <Image
            src={data.image.mediaItemUrl}
            layout='fill'
            objectFit='contain'
            alt={data.title}
          />
        </figure>
      )}
      <h3>{data.title}</h3>
      <p className='mt-3'>{data.text}</p>
    </div>
  );
};

export default Blurb;
