import Link from 'next/link';
import Script from 'next/script';
import { useState } from 'react';
import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';
const SubNav = () => {
  const [translateOpen, setTranslateOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const cookieConsentState = useCookieConsentState()
  return (
    <>
      {translateOpen && (
        <>
          <Script
            strategy='lazyOnload'
            type='text/javascript'
            src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
            onLoad={() => {
              setScriptLoaded(true);
            }}
          />
          <Script
            strategy='lazyOnload'
            id='google-translate'
            type='text/javascript'
          >
            {`function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en_US'}, 'google_translate_element');
}`}
          </Script>
        </>
      )}

      <div className='block text-white bg-black/50'>
        <div className='relative flex items-center justify-between contain'>
          <button onClick={() => setTranslateOpen(!translateOpen)}>
            Translate
          </button>
          <ul className='items-center justify-end hidden py-2 space-x-3 text-sm font-bold uppercase md:flex'>
            <Link href='/content'>
              <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/content`, `General content`) : ''}>General content</a>
            </Link>
            <span> | </span>
            <Link href='/documents'>
              <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/documents`, `Documents`) : ''}>Documents</a>
            </Link>
          </ul>
          <div
            className={`${
              translateOpen
                ? 'block pointer-events-auto'
                : 'hidden pointer-events-none'
            } bg-white text-black p-4 w-52 absolute top-full z-[99] left-0`}
            id='google_translate_element'
          >
            {!scriptLoaded && <p>Loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
};
export default SubNav;
