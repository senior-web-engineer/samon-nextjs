import Link from 'next/link';
import Script from 'next/script';
import store from 'store';
import { useEffect } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { useCookieConsentState } from '@lib/context/cookieConsent';
interface GDPRProps {}

const GDPR = ({}: GDPRProps) => {
  
  const cookieConsentState = useCookieConsentState()
  return (
    <>
      
      {cookieConsentState?.lf && cookieConsentState?.isSet ? (

        <>
            <noscript>
              <img
                src="https://secure.leadforensics.com/216189.png"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>

              <Script 
                strategy="afterInteractive"
                type="text/javascript"
                src="https://secure.leadforensics.com/js/216189.js"
              />
              <Script
                strategy="afterInteractive"
                type='text/javascript'
                src='https://secure.leadforensics.com/js/sc/216189.js'
              />

          </>
      ) : null}
      {cookieConsentState?.ga && cookieConsentState?.isSet ? (
            <>
            <Script
              strategy='afterInteractive'
              src='https://www.googletagmanager.com/gtag/js?id=G-13E16D5MQL'
            />
            <Script
              id='google-analytics'
              strategy='afterInteractive'
            >{`window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-13E16D5MQL');`}</Script>
          </>

      ) : null}


{/* 
        <div
          key='gdpr'
          className='fixed grid md:grid-cols-[2fr,200px] items-center justify-between bottom-5 z-[99999] rounded shadow-xl max-w-[90%] p-4 left-1/2 -translate-x-1/2 w-screen bg-white'
        >
          <div>
            <strong>Samon uses cookies</strong>
            <p>
              We use cookies to gather valuable information that helps us
              improve our website and our business.
            </p>
          </div>
          <div className='grid grid-cols-[1fr] mt-5  md:mt-0'>
            <button 
            >
              <a className='block w-full py-3 font-bold text-center text-white rounded-full bg-brand-red' onClick={() => cookie.update(true)} href={process.env.NEXT_PUBLIC_MY_WEBSITE}>
              Accept
              </a>
            </button>
          </div>
        </div> */}

    </>
  );
};

export default GDPR;

// export const useGDPR = () => {
//   const [cookieConsent, setCookieConsent] = useState(
//     store.get('cookieconsent') || false
//   );
//   useEffect(() => {
//     store.set('cookieconsent', cookieConsent);
//   }, [cookieConsent]);
//   return { cookie: { consent: cookieConsent, update: setCookieConsent } };
// };