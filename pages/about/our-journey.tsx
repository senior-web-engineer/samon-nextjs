import 'dayjs/locale/sv';

import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import dayjs from 'dayjs';
import { getJourney } from '@lib/fetch/getJourney';

const Page = ({ journey, milestones }) => {
  return (
    <>
      <Hero />
      <Intro heading={journey.journeyheading} body={journey.journeytext} />
      <ul className='space-y-10 contain row md:space-y-0'>
        {milestones.map((m) => (
          <li
            key={m.date}
            className='grid gap-2 md:gap-20 md:grid-cols-[96px,1fr] group'
          >
            <div className='relative'>
              <span className='hidden group-last:hidden md:block md:journey-line' />
              <figure className='relative z-20 flex flex-col items-center justify-center w-16 h-16 text-lg text-white bg-black rounded-full md:w-24 md:h-24 '>
                <span className='text-sm font-bold md:text-lg'>
                  {dayjs(m.date).locale('sv').format('YYYY')}
                </span>
                <span className='text-xs md:text-base'>
                  {dayjs(m.date).locale('sv').format('MMM')}
                </span>
              </figure>
            </div>
            <div>
              <div className='pb-3 border-b-2 border-black'>
                <h2 className='text-2xl'>{m.heading}</h2>
              </div>
              <div className='grid lg:grid-cols-[2fr,1fr] gap-5 md:gap-10 pt-5'>
                <div className='order-1 md:order-1'>{m.text}</div>
                <figure className='relative md:mb-10 order-0 md:order-1 aspect-w-16 aspect-h-10'>
                  {m.image && (
                    <Image
                      src={m.image.mediaItemUrl}
                      layout='fill'
                      objectFit='cover'
                      alt={m.heading}
                    />
                  )}
                </figure>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Page;

export const getStaticProps = async () => {
  return {
    notFound: true,
  };
  const journey = await getJourney();
  const milestones = journey.milestones.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return {
    props: { journey, milestones },
  };
};
