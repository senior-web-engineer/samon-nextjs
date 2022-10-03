import Button from '@common/ui/Buttons/Button';
import Image from 'next/image';
import Link from 'next/link';
import PuffDefault from '../../public/images/puff-default.png';
import parse from 'html-react-parser';
interface IPuffButton {
  label: string;
  href: string;
}
interface IPuff {
  fullwidth: boolean;
  heading: string;
  body?: string;
  button?: IPuffButton;
  light: boolean;
}
const Puff = ({
  heading,
  body,
  button,
  light = false,
  fullwidth = false,
}: IPuff) => {
  if (fullwidth) {
    return (
      <div className='relative bg-black'>
        <Image
          src={PuffDefault}
          layout='fill'
          objectFit='cover'
          alt={heading}
          className='opacity-60'
        />

        <div className='z-10 flex items-center justify-center h-[60vh]'>
          <div
            className={`relative  text-center space-y-3 ${
              light ? 'text-white' : 'text-black'
            }`}
          >
            <h2 className=''>{heading}</h2>
            {body && <div>{parse(body)}</div>}
            {button && <Button href={button.href}>{button.label}</Button>}
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};
export default Puff;
