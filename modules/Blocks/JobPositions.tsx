import Image from 'next/image';
import Link from 'next/link';
interface JobPositionsProps {
  data: any;
}

const JobPositions = ({ data }: JobPositionsProps) => {
  const { title, positions } = data;
  const columns = () => {
    if (positions) {
      switch (positions?.length) {
        case 4:
          return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        default:
          return 'md:grid-cols-2 lg:grid-cols-3';
      }
    } else {
      return 'md:grid-cols-2';
    }
  };
  return (
    <div className=''>
      <div className='mb-10 text-center'>
        <h2>{title}</h2>
      </div>
      {positions ? (
        <div className={`grid ${columns()} gap-10`}>
          {positions?.map((position) => {
            //('POS =>', position);
            return (
              <div key={position.id}>
                <Link href={`/about/career/${position.slug}`}>
                  <a>
                    <figure className='aspect-w-16 aspect-h-10 bg-brand-gray'>
                      {position?.featuredImage?.node?.mediaItemUrl && (
                        <Image
                          src={position?.featuredImage?.node?.mediaItemUrl}
                          layout='fill'
                          objectFit='cover'
                          alt={`${position?.title}`}
                        />
                      )}
                    </figure>
                  </a>
                </Link>
                <div className='mt-5'>
                  <Link href={`/about/career/${position.slug}`}>
                    <a>
                      <h3>{position.title}</h3>
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className='text-center'>
          We currently don{"'"}t have any open positions.
        </p>
      )}
    </div>
  );
};

export default JobPositions;
