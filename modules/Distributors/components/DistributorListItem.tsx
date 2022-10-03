import Image from 'next/image';
import Link from 'next/link';
import { flattenObject } from '@utils/helpers';
const DistributorListItem = ({ item }) => {
  const ob = flattenObject(item);

  //(ob);
  return (
    <li className='p-5 space-y-6 text-center border rounded '>
      {ob['featuredImage.node.mediaItemUrl'] && (
        <figure className='relative aspect-w-16 aspect-h-5'>
          <Image
            src={ob['featuredImage.node.mediaItemUrl']}
            layout='fill'
            objectFit='contain'
            alt={item.title}
          />
        </figure>
      )}
      <div className='w-full space-y-5 text-sm'>
        <h2 className='text-xl'>{item.title}</h2>
        <div>
          {ob['distributorFields.information.website'] && (
            <p className=''>
              {ob['distributorFields.information.website'].split('/')[2]}
            </p>
          )}
          {ob['distributorFields.information.phone'] && (
            <p>{ob['distributorFields.information.phone']}</p>
          )}
          {ob['distributorFields.information.email'] && (
            <p className='w-full break-all max-w-[229px]'>
              {ob['distributorFields.information.email']}
            </p>
          )}
        </div>
        <div>
          {ob['distributorFields.information.address.streetAddress'] && (
            <p>{ob['distributorFields.information.address.streetAddress']}</p>
          )}
        </div>
      </div>

      <a
        href={
          ob['distributorFields.information.productUrl'] ||
          ob['distributorFields.information.website']
        }
        rel='noreferrer'
        target='_blank'
        className='inline-block px-4 py-2 text-white uppercase rounded-full bg-brand-red font-display'
      >
        Visit website
      </a>
    </li>
  );
};
export default DistributorListItem;
