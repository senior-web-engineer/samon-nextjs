import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
//import frontImg  from '/images/font-page-meta.png'
interface SeoProps {
  seo?: any;
  uri?: any;
}

const Seo = ({ seo, uri }: SeoProps) => {

    const {
        title,
        metaDesc,
        opengraphDescription,
        opengraphTitle,
        opengraphImage,
        opengraphSiteName,
    } = seo;



    const currentLocation = process.browser ? window.location.origin : null;

    const opengraphUrl =
    (process.env.NEXT_PUBLIC_MY_WEBSITE
      ? process.env.NEXT_PUBLIC_MY_WEBSITE
      : currentLocation) + uri;

    return (
        <NextSeo 
        title={title}
        description={metaDesc || opengraphDescription}
        canonical={opengraphUrl}
        openGraph={{
          type: 'website',
          locale: 'sv_SE',
          url: opengraphUrl,
          title: opengraphTitle,
          description: opengraphDescription ? opengraphDescription : metaDesc,
          images: [
            {
              url: '' && opengraphImage?.sourceUrl ? opengraphImage?.sourceUrl : '',
              width: 1280,
              height: 720,
            },
          ],
          /* eslint-disable */
          site_name: opengraphSiteName,
          /* eslint-enable */
        }}
        twitter={{
          handle: '@samon',
          site: '@samon',
          cardType: 'summary_large_image',
        }}
        />
    )
}

Seo.propTypes = {
    seo: PropTypes.object,
};
  
Seo.defaultProps = {
    seo: {
        canonical: '',
        title: '',
        metaDesc: '',
        metaRobotsNoindex: '',
        metaRobotsNofollow: '',
        opengraphDescription: '',
        opengraphTitle: '',
        opengraphImage: {
          sourceUrl: '',
        },
        opengraphUrl: '',
        opengraphSiteName: '',
    },
};

export default Seo;