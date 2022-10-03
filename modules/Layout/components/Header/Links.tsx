import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { links } from '@data/links';
import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';

const linkItemStyles = `font-display uppercase block py-3`;
const Links: React.FC = () => {

  const cookieConsentState = useCookieConsentState()
  
  return (
    <ul className='items-center hidden space-x-4 md:flex '>
      {links.main.map((link) => {
        if (link.subnav) {
          return (
            <div key={link.label} className='relative group'>
              <Link href={link.href} >
                <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${link.href}`, `${link.label}`) : ''} className={`${linkItemStyles}`}>{link.label}</a>
              </Link>
              <span className='absolute bottom-0 hidden w-3 h-3 rotate-45 translate-y-1/2 bg-white group-hover:block left-1/2' />
              <div
                className={`absolute  z-40 box-border left-1/2 -translate-x-1/2 transition-all hidden p-5 bg-white shadow-lg   top-[100%] group-hover:grid ${'w-72 grid-cols-1'}`}
              >
                {link.subnav.map((nav, navIndex) => {
                  return (
                    <div key={nav.label}>
                      {nav.subnav ? (
                        <>
                          <strong
                            className={
                              nav.subnav ? 'font-bold font-display' : ''
                            }
                          >
                            {nav.label}
                          </strong>
                          <ul className='mt-3 space-y-1'>
                            {nav?.subnav?.map((sublink) => (
                              <li key={sublink.label}>
                                <Link href={sublink?.href || '/'} >
                                  <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${sublink.href}`, `${sublink.label}`) : ''} className='hover:text-brand-red'>
                                    {sublink.label}
                                  </a>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <>
                          <li
                            className={` ${
                              navIndex < link?.subnav?.length ? 'mb-2' : ''
                            }`}
                            key={nav.href}
                          >
                            <Link href={nav?.href || '/'}>
                              <a  onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${nav?.href || '/'}`, `${nav.label}`)  : ''} className='hover:text-brand-red'>
                                {nav.label}
                              </a>
                            </Link>
                          </li>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else {
          return (
            <Link key={link.label} href={link.href}>
              <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com${link.href}`, `${link.label}`)  : ''} className={linkItemStyles}>{link.label}</a>
            </Link>
          );
        }
      })}
    </ul>
  );
};
export default Links;
