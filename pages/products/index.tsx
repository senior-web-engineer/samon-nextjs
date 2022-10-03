import CategorySection from '@modules/Commerce/components/Products/CategorySection';
import Guide from '@modules/Commerce/components/Guide/Guide';
import Hero from '@common/sections/Hero';
import MostPopular from '@modules/Commerce/components/Products/MostPopular';
import NavBar from '@modules/Commerce/components/UI/NavBar';
import { NextSeo } from 'next-seo';
import PageTitle from '@modules/Commerce/components/UI/PageTitle';
import ProductsGrid from '@modules/Commerce/components/Products/ProductsGrid';
import fs from 'fs/promises';
import getAllProducts from '@lib/commerce/products/getAllProducts';
import getMostPopularProducts from '@lib/commerce/products/getMostPopularProducts';
import getProductCategories from '@lib/commerce/products/getProductCategories';
import Script from 'next/script';

export default function Products({ categories, products, mostPopular }) {
  
  return (
    <>
      <NextSeo
        title={`Products: Gas detectors, monitoring units & auxiliary equipment`}
      />
      <Hero />
      <NavBar />
      <PageTitle title={'Products'} />

      {/* <Guide /> */}
      <CategorySection categories={categories} />
      <div className='bg-brand-gray'>
        {mostPopular.length > 0 && <MostPopular products={mostPopular} />}
        <ProductsGrid title='All products' products={products} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const categories = await getProductCategories();
  const products = await getAllProducts();
  const mostPopular = await getMostPopularProducts(products);

  await fs.writeFile('./data/product-search.json', JSON.stringify(products));

  return {
    props: { categories, products, mostPopular },
  };
}
