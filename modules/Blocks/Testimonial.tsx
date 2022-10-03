import Image from 'next/image';

interface TestimonialBlockProps {
  data: any;
}

const TestimonialBlock = ({ data }: TestimonialBlockProps) => {
  //('TestimonialBlock =>', data);
  const { name, title, quote, image } = data;
  return (
    <div className='px-5 bg-white rounded shadow py-7'>
      <div className='grid gap-5 grid-cols-[64px,1fr] mb-5'>
        <figure className='overflow-hidden rounded-full aspect-w-1 aspect-h-1 bg-brand-gray'>
          {image && image.mediaItemUrl && (
            <Image
              src={image.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt={`${name}`}
            />
          )}
        </figure>
        <div className='flex flex-col justify-center'>
          <strong>{name}</strong>
          <span>{title}</span>
        </div>
      </div>
      <div className=''>{quote}</div>
    </div>
  );
};

export default TestimonialBlock;
