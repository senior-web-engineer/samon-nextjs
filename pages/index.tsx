import { APPLICATIONS_ALL } from '@queries/applications';
import Grid from '@common/sections/Grid';
import Hero from '@common/sections/Hero';
import NewsEventsGrid from '@common/sections/NewsEventsGrid';
import { NextSeo } from 'next-seo';
import ProductCategories from '@common/sections/ProductCategories';
import Puff from '@common/sections/Puff';
import Sustainability from '@common/sections/Sustainability';
import { fetchSortedProductCategories } from '../lib/fetch/fetchSortedProductCategories';
import getFrontpageApplications from '@lib/fetch/getFrontPageApplications';
import { getGases } from '@lib/fetch/getGases';
import getLatestNews from '@lib/content/getLatestNews';
import wp from 'lib/wp/wp';
import getHomePage from '@lib/seo/lib/get-page';

const Home = ({ applications, productCategories, gases, news, page }) => {
  return (
    <>
      <NextSeo 
        openGraph={{
          type: 'website',
          locale: 'sv_SE',
          images: [
            {
              url: news[0]?.node?.featuredImage?.node?.mediaItemUrl,
              width: 1280,
              height: 720,
            },
          ],
        }}
        twitter={{
          handle: '@samon',
          site: '@samon',
          cardType: 'summary_large_image',
        }}
      />
      <Hero
        array={gases}
        cta
        heading='What do you want to detect?'
        full={true}
      />
      <Grid items={applications} darkText heading='Application overview' />
      <Puff
        fullwidth
        heading='Simply reliable'
        body='Safety is what we do. Worldwide.'
        button={{
          label: 'Learn more',
          href: '/about/this-is-samon',
        }}
        light
      />
      <ProductCategories
        bg='gray'
        heading='What we offer'
        items={productCategories}
      />
      <Sustainability />
      <NewsEventsGrid heading='Latest News & Events' bg='gray' items={news} />
    </>
  );
};
export default Home;

export const getStaticProps = async () => {
  try {
    const resolved = await Promise.all([
      wp(APPLICATIONS_ALL),
      fetchSortedProductCategories(),
      getGases(),
    ]);

    const page = await getHomePage()
    const allApplication = await getFrontpageApplications();
    const allProductCategory = resolved[1];
    const allGas = resolved[2];

    const news = await getLatestNews();

    return {
      props: {
        applications: allApplication,
        productCategories: allProductCategory,
        gases: allGas,
        news,
        page,
      },
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
