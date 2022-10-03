import Actions from './Actions';
import Links from './Links';
import Logo from '@common/ui/Logo/Logo';
import MobileMenu from './MobileMenu';

const Menu: React.FC = () => {
  return (
    <nav className='flex items-center justify-between py-4 contain'>
      <Logo />
      <div className='flex items-center space-x-5'>
        <Links />
        <Actions />
        <MobileMenu />
      </div>
    </nav>
  );
};
export default Menu;
