import Image from 'next/image';
import Link from 'next/link';
import TempImage from '../../public/images/samon-hero.jpg';
import { translateColor } from 'utils/colors';
interface IGrid {
  heading?: string;
  items: any[];
  bg?: string;
  darkText?: boolean;
}
const NewsEventsGrid = ({
  heading,
  items,
  bg = 'white',
  darkText = false,
}: IGrid) => {
  return (
    <div className={`row ${translateColor(bg)}`}>
      <div className='text-center row-sm contain'>
        <h2 className=''>{heading}</h2>
      </div>
      <div className='grid grid-cols-2 gap-2 md:gap-5 lg:grid-cols-3 row-sm contain'>
        {items &&
          items.map(({ node: item }, index) => {
            if (index < 6) {
              return (
                <Link key={item + index} href={item.uri}>
                  <a
                    className={`group aspect-w-16 aspect-h-12 bg-black relative overflow-hidden rounded-sm ${'col-span-1 lg:row-span-1'}`}
                  >
                    <Image
                      src={item.featuredImage.node.mediaItemUrl}
                      layout='fill'
                      objectFit='cover'
                      className='transition-all opacity-40 group-hover:scale-105'
                      alt={item.title}
                    />

                    <h3
                      className={`p-3 text-sm md:text-xl  md:p-5 lg:p-10 ${
                        darkText ? 'text-black' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </a>
                </Link>
              );
            }
          })}
      </div>
    </div>
  );
};
export default NewsEventsGrid;
