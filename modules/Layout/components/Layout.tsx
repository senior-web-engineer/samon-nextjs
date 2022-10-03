import Floater from './UI/Floater';
import Footer from '@modules/Layout/components/Footer/Footer';
import GDPR from '@common/components/GDPR';
import Header from '@modules/Layout/components/Header/Header';
import PreviewProduct from '@modules/Commerce/components/Product/PreviewProduct';
import { ReactChild } from 'react';
import Seo from '@lib/seo';
interface LayoutProps {
  children?: ReactChild;
  data?: any;
  seo?: any;
}

const Layout = ({ children, data, seo }: LayoutProps) => {
  return (
    <>
      <Seo seo={seo?.seo} uri={seo?.uri} />
      <Header />
      <main>
        {children}
        <Floater />
        <PreviewProduct />
      </main>
      <Footer cta={data?.cta} />
      <GDPR />
    </>
  );
};
export default Layout;
