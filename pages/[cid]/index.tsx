import {
  CONTENT_ALL,
  CONTENT_CATEGORIES,
  CONTENT_CATEGORY,
} from '@queries/content';

import ContentList from '@modules/Content/components/ContentList';
import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';
import wp from 'lib/wp/wp';

const ContentPage = ({ page, contents, categories }) => {
  return (
    <>
      <NextSeo title={`${page.name}`} description={page.description} />
      <Hero />
      <Intro heading={page.name} body='' />
      <ContentList items={contents} filter={categories} />
    </>
  );
};
export default ContentPage;

export async function getStaticPaths() {
  const categoryData = await wp(CONTENT_CATEGORIES);
  const categories = categoryData.allContentCategory.edges.map((o) => {
    return {
      params: { cid: o.node.slug },
    };
  });
  categories.push({ params: { cid: 'content' } });
  return {
    paths: categories,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const cid = context.params.cid;

  try {
    if (cid === 'content') {
      const resolved = await Promise.all([
        wp(CONTENT_ALL),
        wp(CONTENT_CATEGORIES),
      ]);
      const contents = resolved[0].allContent.edges;
      const categories = resolved[1].allContentCategory.edges.map(
        ({ node: item }) => item
      );
      return {
        props: {
          page: {
            name: 'Content',
            description: '',
          },
          contents,
          categories,
        },
      };
    } else {
      const resolved = await Promise.all([
        wp(CONTENT_CATEGORY, { variables: { id: cid } }),
        wp(CONTENT_CATEGORIES),
      ]);
      const contents = resolved[0].contentCategory.allContent.edges;
      const categories = resolved[1].allContentCategory.edges.map(
        ({ node: item }) => item
      );

      return {
        props: {
          page: resolved[0].contentCategory,
          contents,
          categories,
        },
      };
    }
  } catch (error) {
    //('ERROR =>', error);
    return {
      notFound: true,
    };
  }
}
