import Image from 'next/image';
import Link from 'next/link';
import SustainabilityImage from '../../public/images/samon-sustainability-4.png';
import { useCookieConsentState } from '@lib/context/cookieConsent';
import { track_load } from '@lib/lf';
const Sustainability = () => {
  const cookieConsentState = useCookieConsentState()
  return (
    <div className='row'>
      <div className='w-[85%] md:max-w-xl mx-auto text-center'>
        <h2 className=''>Sustainability</h2>
        <p className='mt-3'>
          SAMONs mission is to reduce the negative impact of gas leakeges from
          harmfull gases in order to increase Good health and wellbeeing, Clean
          water and Sanitation, build sustainable cities and communiteis as well
          as provide Climate actions.
        </p>
        <Link href='/about/sustainability'>
          <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/about/sustainability`, `about - sustainability`) : ''} className='inline-block mt-5 btn'>Read more</a>
        </Link>
        <div className='mt-5'>
          <Image src={SustainabilityImage} alt='Samon sustainability' />
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
