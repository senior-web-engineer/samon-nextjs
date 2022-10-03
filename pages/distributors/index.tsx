import { DISTRIBUTORS_ALL } from '@queries/distributors';
import DistributorList from '@modules/Distributors/components/DistributorList';
import DistributorMap from '@modules/Distributors/components/DistributorMap';
import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import wp from 'lib/wp/wp';

const ReferencePage = ({ distributors }) => {
  const [filteredItems, setFilteredItems] = useState(distributors);
  return (
    <>
      <NextSeo title='Distributors' />
      <Hero />
      <Intro heading='Distributors' body='' />

      <DistributorMap items={filteredItems} />
      <DistributorList items={filteredItems} />
    </>
  );
};
export default ReferencePage;
export const getStaticProps = async () => {
  try {
    const resolved = await wp(DISTRIBUTORS_ALL);
    const distributors = resolved.allDistributor.edges.map(
      ({ node: distributor }) => distributor
    );

    return {
      props: {
        distributors,
        cta: {
          title: `Would you like to become a distributor?`,
        },
      },
    };
  } catch (error) {
    console.log('error', error);
    return {
      notFound: true,
    };
  }
};
