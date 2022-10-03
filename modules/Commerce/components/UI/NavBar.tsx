import BreadCrumbs from './BreadCrumbs';
import SearchInput from './SearchInput';
import Sticky from 'react-sticky-el';

export default function NavBar() {
  return (
    <div className='relative z-[49]'>
      <div className=''>
        <Sticky stickyStyle={{ zIndex: 99, backgroundColor: 'white' }}>
          <div className='py-5 bg-white contain z-[99]'>
            <div className='flex items-center justify-between w-full '>
              <BreadCrumbs />
              <SearchInput />
            </div>
          </div>
        </Sticky>
      </div>
    </div>
  );
}
