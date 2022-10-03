import Image from 'next/image';
import Link from 'next/link';
import { flattenObject } from '@utils/helpers';

const ContentListItem = ({ item, index, count }) => {
  item = flattenObject(item);
  const isBig =
    count < 6
      ? false
      : index === 0 ||
        index === 7 ||
        index === 10 ||
        index === 17 ||
        index === 20
      ? true
      : false;

  return (
    <li
      className={`group overflow-hidden relative bg-black aspect-w-16 aspect-h-10 rounded-sm `}
    >
      <Link href={`/${item['contentFields.settings.type.slug']}/${item.slug}`}>
        <a>
          {item['featuredImage.node.mediaItemUrl'] && (
            <Image
              src={item['featuredImage.node.mediaItemUrl']}
              layout='fill'
              objectFit='cover'
              className='transition-all opacity-40 group-hover:scale-105'
              alt={item.title}
            />
          )}
          <div className='relative z-10 p-5 text-white'>
            <h3 className=''>{item.title}</h3>
            {item['contentFields.settings.type.name'] && (
              <p className='text-sm'>
                {item['contentFields.settings.type.name']}
              </p>
            )}
          </div>
        </a>
      </Link>
    </li>
  );
};
export default ContentListItem;
