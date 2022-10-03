import GasDetectionForm from '@modules/Applications/components/forms/GasDetectionForm';
import HeroImage from '../../public/images/samon-hero.png';
import Image from 'next/image';
import react from 'react';
const heroBaseStyles = 'relative h-56 md:h-96 flex items-center justify-center';
const fullLayoutStyles = 'w-screen !h-screen';
interface IHeroProps {
  full?: boolean;
  socials?: boolean;
  cta?: boolean;
  heading?: string;
  showFooter?: boolean;
  array?: [];
}
const Hero = ({
  full = false,
  cta = false,
  heading = '',
  showFooter = false,
  array,
}: IHeroProps): JSX.Element => {
  return (
    <div className={`${heroBaseStyles} ${full ? fullLayoutStyles : ''}`}>
      <Image
        className='pointer-events-none'
        src={HeroImage}
        layout='fill'
        objectFit='cover'
        priority
        alt='Samon hero image'
      />
      {heading && (
        <div className='z-10 px-5'>
          <h1 className='text-center normal-case'>{heading}</h1>
          {cta && <GasDetectionForm gases={array} />}
        </div>
      )}
      {showFooter && (
        <div className='absolute bottom-5 right-5'>
          <p>Hero footer</p>
        </div>
      )}
    </div>
  );
};
export default Hero;
