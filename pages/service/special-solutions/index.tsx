import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import Link from 'next/link';
import PageTitle from '@modules/Commerce/components/UI/PageTitle';
import getPage from '@lib/page/getPage';
const services = [
  {
    heading: 'Special projects',
    href: '/service/special-projects',
    text: 'Senes supermarket, industry, marine, hotels/offices, ice rinks, dairy, butchers, garage and many more',
    image: '/images/samon-placeholder.jpg',
  },
  {
    heading: 'Customized gas detectors',
    href: '/service/customized-gas-detectors',
    text: 'Senes supermarket, industry, marine, hotels/offices, ice rinks, dairy, butchers, garage and many more',
    image: '/images/samon-placeholder.jpg',
  },
];
export const getStaticProps = async (context) => {
  const page = await getPage('service/special-solutions');
  return { props: { page } };
};
interface PageProps {
  page: any;
}

const Page = ({ page }: PageProps) => {
  const acf = page?.gqlPageFields;
  return (
    <>
      <Hero />
      <Intro
        heading='Special solutions'
        body='Include all segments using large cooling systems for food preservation, dairy, butchers, healthcare, manufacturing companies and ice rinks.'
      />
      <Content sections={acf?.layout} />
    </>
  );
};

export default Page;
