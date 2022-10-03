import Image from 'next/image';

interface PeopleBlockProps {
  data: any;
}

const PeopleBlock = ({ data }: PeopleBlockProps) => {
  //('People =>', data);
  const { title, people } = data;

  return (
    <div className='text-center'>
      <h2 className='mb-10'>{title}</h2>
      <div className='grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {people.map((person) => (
          <div key={person.name + person.title}>
            <figure className='mb-5 aspect-w-1 aspect-h-1 bg-[#E9E9E9]'>
              {person.video && (
                <video playsInline autoPlay muted width='100%' height='100%'>
                  <source
                    src={person.video.mediaItemUrl}
                    type='video/mp4'
                  ></source>
                </video>
              )}
              {!person.video && person.image && (
                <Image
                  src={person.image.mediaItemUrl}
                  layout='fill'
                  objectFit='cover'
                  alt={`Portrait of ${person.name} ${person.title}`}
                />
              )}
            </figure>
            <strong>{person.name}</strong>
            <p className='mb-4'>{person.title}</p>
            <p>{person.phone}</p>
            <p>{person.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleBlock;
