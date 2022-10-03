import Image from 'next/image';
import Link from 'next/link';
interface ReferenceListProps {
  data: any;
}

const ReferenceList = ({ data }: ReferenceListProps) => {
  const { cases } = data;

  return (
    <div>
      <strong className='text-lg'>{data.title}</strong>
      <ul className='mt-5 space-y-2'>
        {cases?.map((item) => (
          <li className='grid grid-cols-[64px,1fr] gap-5' key={item.id}>
            <Link href={`/references/${item.slug}`}>
              <a>
                <figure className='relative w-16 h-16'>
                  <Image
                    src={
                      item?.featuredImage?.node?.mediaItemUrl ||
                      '/images/samon-placeholder.jpg'
                    }
                    objectFit='cover'
                    layout='fill'
                    alt={item.title}
                  />
                </figure>
              </a>
            </Link>
            <div>
              <Link href={`/references/${item.slug}`}>
                <a>
                  <strong>{item.title}</strong>
                </a>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReferenceList;
