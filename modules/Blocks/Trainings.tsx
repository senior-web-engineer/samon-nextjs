import Image from 'next/image';
import Link from 'next/link';
interface TrainingsBlocksProps {
  data: any;
}

const TrainingsBlocks = ({ data }: TrainingsBlocksProps) => {
  //('TRAINING BLOCKS =>', data);
  const { trainings } = data;
  return (
    <ul className='grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {trainings.map((item) => {
        const { shortDescription } = item.gqlTrainingFields;
        const href = `/service/trainings/${item.slug}`;
        return (
          <li key={item.id}>
            <Link href={href}>
              <a className='block mb-3 aspect-w-16 aspect-h-10 bg-brand-gray'>
                {item?.featuredImage?.node?.mediaItemUrl && (
                  <Image
                    src={item.featuredImage.node.mediaItemUrl}
                    layout='fill'
                    objectFit='cover'
                    alt={`${item.title} image`}
                  />
                )}
              </a>
            </Link>
            <Link href={href}>
              <a>
                <h2 className='text-xl'>{item.title}</h2>
              </a>
            </Link>
            {shortDescription && (
              <p className='mt-2 text-sm'>{shortDescription}</p>
            )}
            <Link href={href}>
              <a className='inline-block mt-3 text-brand-red'>Read more</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TrainingsBlocks;
