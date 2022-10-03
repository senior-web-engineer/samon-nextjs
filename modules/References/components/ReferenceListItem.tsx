import Image from 'next/image';
import Link from 'next/link';
import { flattenObject } from '@utils/helpers';
const ReferenceListItem = ({ item }) => {
  const ob = flattenObject(item);

  return (
    <li className='space-y-6'>
      {ob['featuredImage.node.mediaItemUrl'] && (
        <Link href={`/references/${item.slug}`}>
          <a className='relative block aspect-w-16 aspect-h-10'>
            <Image
              src={ob['featuredImage.node.mediaItemUrl']}
              layout='fill'
              objectFit='cover'
              alt={item.title}
            />
          </a>
        </Link>
      )}
      <div>
        <h2 className='text-xl'>{item.title}</h2>
        <p></p>
      </div>
      {ob['referenceFields.information.customerValue'] && (
        <div>
          <strong className='uppercase'>Customer value</strong>
          <p>{ob['referenceFields.information.customerValue']}</p>
        </div>
      )}
      {ob['referenceFields.information.address.country'] && (
        <div>
          <strong className='uppercase'>Location</strong>
          <p>{ob['referenceFields.information.address.country']}</p>
        </div>
      )}
      <Link href={`/references/${item.slug}`}>
        <a className='inline-block px-4 py-2 text-white uppercase rounded-full bg-brand-red font-display'>
          Read more
        </a>
      </Link>
    </li>
  );
};
export default ReferenceListItem;
