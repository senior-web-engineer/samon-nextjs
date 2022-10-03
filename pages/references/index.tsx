import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';
import { REFERENCE_ALL } from '@queries/reference';
import ReferenceFilter from '@modules/References/components/ReferenceFilter';
import ReferenceList from '@modules/References/components/ReferenceList';
import ReferenceMap from '@modules/References/components/ReferenceMap';
import getPage from '@lib/page/getPage';
import { useState } from 'react';
import wp from 'lib/wp/wp';

const ReferencePage = ({ references, page }) => {
  const [filteredItems, setFilteredItems] = useState(references);
  const acf = page.gqlPageFields;

  return (
    <>
      <NextSeo title='References' />
      <Hero />
      <Intro heading={page.title} body={acf.intro} />
      <ReferenceFilter
        allItems={references}
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
      />
      <ReferenceMap items={filteredItems} />
      <ReferenceList items={filteredItems} />
      <Content sections={acf?.layout} />
    </>
  );
};
export default ReferencePage;
export const getStaticProps = async () => {
  try {
    const resolved = await Promise.all([wp(REFERENCE_ALL)]);
    const references = resolved[0].allReference.edges.map(
      ({ node: reference }) => reference
    );
    const page = await getPage('about/references');
    if (!page) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        references,
        page,
      },
    };
  } catch (error) {
    //(error);
    return {
      notFound: true,
    };
  }
};
