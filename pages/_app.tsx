import '@styles/global.css';

import CartContext from '@modules/Commerce/context/CartContext';
import { DefaultSeo } from 'next-seo';
import FloatContext from '@modules/Layout/context/FloatContext';
import Layout from '@modules/Layout/components/Layout';
import LocationProvider from '@modules/Location/LocationContext';
import PreviewProductContext from '@modules/Commerce/context/PreviewProductContext';
import Script from 'next/script';
import Search from '@modules/Search/components/Search';
import SearchContext from '@modules/Commerce/context/SearchContext';
import WishlistProvider from '@modules/Wishlist/context/WishlistContext';
import useCart from '@modules/Commerce/hooks/useCart';
import useFloater from '@modules/Layout/hooks/useFloater';
import useProductPreview from '@modules/Commerce/hooks/useProductPreview';
import useSearch from '@modules/Commerce/hooks/useSearch';
import GDPR from '@common/components/GDPR';
import { CookieConsentProvider } from '@lib/context/cookieConsent';

function MyApp({ Component, pageProps }) {
  const floater = useFloater();
  const cart = useCart();
  const productPreview = useProductPreview();
  const search = useSearch();
  
  return (
    <>
      <DefaultSeo
        title='Samon:Safe monitoring'
        titleTemplate={`%s - Samon: Safe monitoring`}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />

      {/* <GDPR /> */}
      <CookieConsentProvider>
        <FloatContext.Provider value={floater}>
          <LocationProvider>
            <CartContext.Provider value={cart}>
              <WishlistProvider>
                <DefaultSeo
                  defaultTitle='Samon: Safe monitoring'
                  titleTemplate='%s - Samon: Safe monitoring'
                />
                <PreviewProductContext.Provider value={productPreview}>
                  <SearchContext.Provider value={search}>
                    <Layout data={pageProps} seo={pageProps?.page || {}}>
                      <Component {...pageProps} />
                    </Layout>
                    <Search />
                  </SearchContext.Provider>
                </PreviewProductContext.Provider>
              </WishlistProvider>
            </CartContext.Provider>
          </LocationProvider>
        </FloatContext.Provider>

      </CookieConsentProvider>
    </>
  );
}

export default MyApp;
