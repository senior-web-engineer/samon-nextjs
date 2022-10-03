import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCookieConsentState } from '@lib/context/cookieConsent';

export interface dispatchValueProps {

}

const CookiePopup = ({dispatch}:any) => {
  const [isChecked, setChecked] = useState({
    google: 1,
    cookies: 1,
  })
  const [dispatchValue, setDispatchValue] = useState('acceptAll')
  const cookieConsentState = useCookieConsentState();
  const [showPopup, setPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!cookieConsentState?.isSet && showPopup !== undefined) {
      setPopup(true);
    }
  }, [showPopup]);

  

  useEffect(() => {
    if(isChecked?.google === 1 && isChecked?.cookies === 1){
      setDispatchValue('acceptCurrent')
    } else if (isChecked?.google === 1 && isChecked?.cookies === 0) {
      setDispatchValue('acceptOnlyGoogle')
    } else if (isChecked?.google === 0 && isChecked?.cookies === 1){
      setDispatchValue('acceptOnlyCookie')
    } else {
      setDispatchValue('declineAll')
    }
    return () => {
      setDispatchValue('acceptAll')
    }
  }, [isChecked])
  
  
  return (
    <section id="gdpr" key="gdpr" className='fixed light_box top-0 left-0 w-full h-full z-[1000]'>
      <div className='absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 md:w-[80vw] w-[94vw] bg-brand-gray rounded p-10 z-50 flex flex-col gap-5'>
        <div>
          <p className='text-2xl'>Samon uses cookies</p>
          <p className='text-sm'>We use cookies to gather valuable information that helps us improve our website and our business.</p>
          

        </div>
        <div className='flex flex-col gap-4'>
          <label htmlFor="google" className='flex flex-wrap gap-3'>
            <input 
              type="checkbox" 
              id="google"
              defaultChecked 
              value={isChecked.google}
              onChange={() => setChecked({...isChecked, google: isChecked.google === 1 ? 0 : 1})}
              className='cursor-pointer h-6 w-12 rounded-full appearance-none bg-white bg-opacity-5 border-brand-primary-500 border-2 checked:bg-brand-dark-900 transition duration-200 relative' 
            />
            <div className={`${isChecked.google ? '' : 'line-through'} max-w-[90%]`}>

              <p>Manage data that Google Analytics collects on websites you visit</p>
              <p className='text-xs text-brand-light-500'>Website owners improve their website using data collected in Google Analytics</p>
            </div>
          </label>
          <label htmlFor="cookies" className='flex gap-3'>
            <input 
              type="checkbox" 
              id="cookies" 
              defaultChecked
              value={isChecked.cookies}
              onChange={() => setChecked({...isChecked, cookies: isChecked.cookies === 1 ? 0 : 1})}
              className='cursor-pointer h-6 w-12 rounded-full appearance-none bg-white bg-opacity-5 border-brand-primary-500 border-2 checked:bg-brand-dark-900 transition duration-200 relative' 
            />
            <div className={`${isChecked.cookies ? '' : 'line-through'} max-w-[90%]`}>

              <p>Manage data that <a className='hover:underline' target="_blank" rel="noopener noreferrer" href='https://www.leadforensics.com/'>Lead Forensics</a> collects for marketing</p>
            </div>
          </label>
        </div>
        
        <div className="flex space-x-4">
          <button 
            className='block w-full py-3 font-bold text-center text-white rounded-full bg-brand-red' 
            onClick={() => dispatch({type: 'acceptCurrent'})}
          >
            Allow all
          </button>
          <button 
            className='block w-full py-3 font-bold text-center text-white rounded-full bg-brand-red' 
            onClick={() => dispatch({type: dispatchValue})}
          >
            Allow Selection
          </button>
          <button 
            className='block w-full py-3 font-bold text-center text-white rounded-full bg-brand-red' 
            onClick={() => dispatch({type: 'declineAll'})}
          >
            Deny
          </button>

        </div>
        <Link href="/privacy-policy"><a className='text-sm text-brand-light-500 hover:underline'>Privacy Policy</a></Link>
      </div>
    </section>
  )
}

export default CookiePopup