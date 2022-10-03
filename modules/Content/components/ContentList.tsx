import ContentListItem from './ContentListItem';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

interface IContentList {
  items: [];
  filter?: any;
}

const ContentList = ({ items, filter }: IContentList) => {
  const router = useRouter();

  return (
    <>
      <ul className='flex flex-wrap items-center justify-center mb-10 space-x-3'>
        <li className='mb-3 md:mb-0'>
          <Link scroll={false} href={`/content`}>
            <a
              className={`inline-block px-4 py-1 text-white  bg-brand-darkblue rounded-full font-display ${
                router.asPath === '/content' && '!bg-brand-teal'
              }`}
            >
              All
            </a>
          </Link>
        </li>
        {filter &&
          filter.map((cat) => {
            return (
              <li className='mb-3 md:mb-0' key={cat.slug}>
                <Link scroll={false} href={`/${cat.slug}`}>
                  <a
                    className={`inline-block px-4 py-1 text-white bg-brand-darkblue rounded-full font-display ${
                      router.asPath === `/${cat.slug}` && ' !bg-brand-teal'
                    }`}
                  >
                    {cat.name}
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
      <ul className='grid gap-5 mb-20 sm:grid-cols-2 md:grid-cols-3 contain'>
        {items &&
          items.map(({ node: item }, index) => {
            return (
              <ContentListItem
                key={JSON.stringify(item)}
                count={items.length}
                item={item}
                index={index}
              />
            );
          })}
      </ul>
    </>
  );
};
export default ContentList;
