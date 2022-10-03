import Image from 'next/image';
import Link from 'next/link';
import SamonLogo from '../../../public/images/samon-logo.png';
import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';
const Logo: React.FC = () => {
  const cookieConsentState = useCookieConsentState()
  return (
    <Link href='/'>
      <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/`, `Home`) : ''} className='h-10 w-14 md:w-24 md:h-24'>
        <Image src={SamonLogo} />
      </a>
    </Link>
  );
};
export default Logo;
