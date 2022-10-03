import { CONTENT_ALL, CONTENT_SINGLE } from '@queries/content';
import { GetStaticPaths, GetStaticProps } from 'next';

import { NextSeo } from 'next-seo';
import PostTemplate from '@templates/PostTemplate';
import wp from '../../lib/wp/wp';
import { useRouter } from 'next/router';
import { limit, stripHTML } from '../../lib/utils/miscellaneous';

declare namespace NodeJS {
  export interface Process {
      browser: boolean
  }
}

const Content = ({ post }) => {
  const router = useRouter()
 

  

  const currentLocation = process.browser ? window.location.origin : null;

    const opengraphUrl =
    (process.env.NEXT_PUBLIC_MY_WEBSITE
      ? process.env.NEXT_PUBLIC_MY_WEBSITE
      : currentLocation) + router.asPath;

  const ogDescription = stripHTML(limit(post?.contentFields?.summary, 200))
  return (
    <>
      <NextSeo
        title={`${post.title} - ${post.contentFields.settings.type.name}`}
        description={ogDescription}
        canonical={opengraphUrl}
        openGraph={{
          type: 'website',
          locale: 'sv_SE',
          url: opengraphUrl,
          title: `${post.title} - ${post.contentFields.settings.type.name}`,
          description: ogDescription,
          images: [
            {
              url: post?.featuredImage?.node?.mediaItemUrl,
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
      <PostTemplate post={post} />
    </>
  );
};
export default Content;

export const getStaticPaths: GetStaticPaths = async () => {
  const contentData = await wp(CONTENT_ALL);
  //('CONTENT DATA', contentData);
  const paths = contentData.allContent.edges.map(({ node: o }) => {
    return { params: { cid: o.contentFields.settings.type.slug, pid: o.slug } };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const { pid } = context.params;

  try {
    const resolved = await wp(CONTENT_SINGLE, { variables: { id: pid } });
    const post = resolved.content;
    if (!post) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    //('ERROR =>', error);
    return {
      notFound: true,
    };
  }
};
