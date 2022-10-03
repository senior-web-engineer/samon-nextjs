import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';
import getPage from '@lib/page/getPage';

export const getStaticPaths = async () => {
  const paths = [{ params: { slug: 'service-and-maintenance' } }];
  return { paths, fallback: 'blocking' };
};
export const getStaticProps = async (context) => {
  const page = await getPage(`service/${context.params.slug}`);
  return { props: { page } };
};
interface PageProps {
  page: any;
}

const Page = ({ page }: PageProps) => {
  const acf = page.gqlPageFields;
  return (
    <>
      <NextSeo title={page.seo.title} description={page.seo.metaDesc} />
      <Hero />
      <Intro heading={page.title} body={acf.intro} />
      <Content sections={acf.layout} />
    </>
  );
};

export default Page;
