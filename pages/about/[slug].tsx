import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';
import getPage from '@lib/page/getPage';

export const getStaticPaths = async () => {
  const paths = [
    { params: { slug: '/this-is-samon' } },
    { params: { slug: '/our-people' } },
    { params: { slug: '/career' } },
  ];
  return { paths, fallback: 'blocking' };
};
export const getStaticProps = async (context) => {
  const page = await getPage('about/' + context.params.slug);
  if (!page) {
    return {
      notFound: true,
    };
  }
  return { props: { page } };
};
interface PageProps {
  page: any;
}

const Page = ({ page }: PageProps) => {
  const acf = page.gqlPageFields;

  return (
    <>
      <NextSeo title={`${page.seo.title} - About`} />
      <Hero />
      <Intro heading={page.title} body={acf.intro} />
      <Content sections={acf.layout} />
    </>
  );
};

export default Page;
