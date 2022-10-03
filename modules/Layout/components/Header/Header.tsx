import Menu from './Menu';
import MobileMenu from './MobileMenu';
import SubNav from './SubNav';

const Header: React.FC = () => {
  return (
    <header className='absolute top-0 left-0 z-50 w-full'>
      <SubNav />
      <Menu />
    </header>
  );
};
export default Header;
