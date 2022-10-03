import FooterForm from './FooterForm';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@common/ui/Logo/Logo';
import parse from 'html-react-parser';

const footerBlocks = [
  {
    heading: 'Contact Info',
    body: (
      <ul className='mt-3 space-y-1'>
        <li>
          <p>{'+46-40-155859'}</p>
        </li>
        <li>
          <p>{'order@samon.se'}</p>
        </li>
        <li>
          <p>{'Modemgatan 2'}</p>
        </li>
        <li>
          <p>{'SE-23539, Vellinge'}</p>
        </li>
      </ul>
    ),
  },
  {
    heading: 'Industrial Refrigeration',
    body: (
      <ul className='mt-3 space-y-1'>
        <li>
          <Link href={`/applications/machinery-room-industrial`}>
            <a>Machinery room</a>
          </Link>
        </li>
      </ul>
    ),
  },
  {
    heading: 'HVAC',
    body: (
      <ul className='mt-3 space-y-1'>
        <li>
          <Link href={`/applications/hotels-hvac`}>
            <a>Hotels</a>
          </Link>
        </li>
        <li>
          <Link href={`/applications/offices`}>
            <a>Offices</a>
          </Link>
        </li>
        <li>
          <Link href={`/applications/machinery-room-hvac`}>
            <a>Machinery room</a>
          </Link>
        </li>
      </ul>
    ),
  },
  {
    heading: 'Marine',
    body: (
      <ul className='mt-3 space-y-1'>
        <li>
          <Link href={`/applications/cold-rooms-marine`}>
            <a>Cold rooms</a>
          </Link>
        </li>
        <li>
          <Link href={`/applications/machinery-room-marine`}>
            <a>Machinery room</a>
          </Link>
        </li>
        <li>
          <Link href={`/applications/hotels-hvac`}>
            <a>Hotels</a>
          </Link>
        </li>
      </ul>
    ),
  },
  {
    heading: 'Commercial Refrigeration',
    body: (
      <ul className='mt-3 space-y-1'>
        <li>
          <Link href={`/applications/machinery-room-commercial`}>
            <a>Machinery room</a>
          </Link>
        </li>

        <li>
          <Link href={`/applications/cold-rooms-commercial`}>
            <a>Cold rooms</a>
          </Link>
        </li>
      </ul>
    ),
  },
  {
    heading: 'Products',
    body: (
      <ul className='mt-3 space-y-1'>
        <li>
          <Link href={`/products/detectors`}>
            <a>Detectors</a>
          </Link>
        </li>
        <li>
          <Link href={`/products/monitoring-units`}>
            <a>Monitoring units</a>
          </Link>
        </li>
        <li>
          <Link href={`/products/accessories`}>
            <a>Accessories</a>
          </Link>
        </li>
        <li>
          <Link href={`/products/spare-parts`}>
            <a>Spare parts</a>
          </Link>
        </li>
        <li>
          <Link href={`/products/service-tools`}>
            <a>Service tools</a>
          </Link>
        </li>
        <li>
          <Link href={`/products/other-products`}>
            <a>Other products</a>
          </Link>
        </li>
      </ul>
    ),
  },
  {
    heading: 'Company',
    body: (
      <ul className='mt-3 space-y-1'>
        <li>
          <Link href={`/about/our-people`}>
            <a>Our people</a>
          </Link>
        </li>
        <li>
          <Link href={`/about/this-is-samon`}>
            <a>This is Samon</a>
          </Link>
        </li>
        <li>
          <Link href={`/about/quality`}>
            <a>Quality</a>
          </Link>
        </li>
        {/* <li>
          <Link href={`/about/contact`}>
            <a>Contact</a>
          </Link>
        </li> */}
        <li>
          <Link href={`/about/career`}>
            <a>Career</a>
          </Link>
        </li>
        <li>
          <Link href={`/about/sustainability`}>
            <a>Sustainability</a>
          </Link>
        </li>
        <li>
          <Link href={`/references`}>
            <a>References</a>
          </Link>
        </li>
        <li>
          <Link href={`/contact`}>
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    ),
  },
];
const Footer = ({ cta }) => {
  return (
    <>
      <div className='relative'>
        <div id='footer-cta' className='text-center contain row'>
          <h2 className='uppercase'>
            {cta?.title ? cta?.title : 'Do you want to know more?'}
          </h2>
          <p className='mt-3 text-lg'>
            Fill in the form and we’ll contact you!
          </p>
          <FooterForm />
        </div>
      </div>
      <footer className='text-white bg-black row-sm'>
        <div className='flex justify-center contain'>
          <figure className='relative md:w-56 md:h-44'>
            <Image
              src={`/images/samon-logotyp-white.png`}
              objectFit='contain'
              layout='fill'
              alt={`Samon logotyp med vit text`}
            />
          </figure>
        </div>
        <div className='grid grid-cols-1 gap-5 text-sm md:grid-cols-3 lg:grid-cols-7 row-sm contain'>
          {footerBlocks.map((block) => (
            <div key={block.heading}>
              <strong className='mb-3 text-sm uppercase'>
                {block.heading}
              </strong>
              {block.body && <div className='space-y-2'>{block.body}</div>}
            </div>
          ))}
        </div>
        <div className='justify-between border-t md:flex contain row-sm'>
          <div>Copyright © {new Date().getFullYear()} Samon</div>
          <div>
            Built with <span className='text-brand-red'>❤</span> by Capace Media
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
