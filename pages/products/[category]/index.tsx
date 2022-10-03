import { useEffect, useState } from 'react';

import CategorySection from '@modules/Commerce/components/Products/CategorySection';
import { Combobox } from '@headlessui/react';
import Hero from '@common/sections/Hero';
import MostPopular from '@modules/Commerce/components/Products/MostPopular';
import NavBar from '@modules/Commerce/components/UI/NavBar';
import { NextSeo } from 'next-seo';
import PageTitle from '@modules/Commerce/components/UI/PageTitle';
import ProductsGrid from '@modules/Commerce/components/Products/ProductsGrid';
import getCategoryData from '@lib/commerce/products/getCategoryData';
import getMostPopularProducts from '@lib/commerce/products/getMostPopularProducts';
import getParentCategories from '@lib/commerce/getParentCategories';
import getSubCategories from '@lib/commerce/products/getSubCategories';
import useSparepartsFilter from '@modules/Commerce/hooks/useSparepartsFilter';


export default function ProductCategoryPage({
  categoryData,
  products,
  category,
  subcategories,
  mostPopular,
}) {
  return (
    <>
      <NextSeo title={`${categoryData.name} - Products`} />
      <Hero />
      <NavBar />
      <PageTitle title={categoryData.name} />
      <CategorySection
        noGradient
        categories={subcategories}
        parent={category}
      />
      {category === 'spare-parts' ? (
        <SpareParts
          category={category}
          mostPopular={mostPopular}
          products={products}
        />
      ) : (
        <>
          <div className='bg-brand-gray'>
            {mostPopular.length > 0 && (
              <MostPopular
                products={mostPopular}
                title={`Most popular ${categoryData.name}`}
              />
            )}

            <ProductsGrid
              products={products}
              title={`All ${categoryData.name}`}
            />
          </div>
        </>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const data = await getParentCategories();
  const paths = data.map((item) => {
    return {
      params: { category: item.slug },
    };
  });
  
  return {
    paths: paths || [],
    fallback: 'blocking',
  };
}
export async function getStaticProps(context) {
  const category = context?.params?.category;
  const categoryData = await getCategoryData(category);
  const products = categoryData?.products || [];
  const subcategories = await getSubCategories(category);

  const mostPopular = await getMostPopularProducts(products);

  

  // if(!categoryData || !category || !products || !subcategories || !mostPopular){
  //   return { // <-----------------does the trick here!!
  //     notFound: true
  //   }
  // }

  return {
    props: { categoryData, products, category, mostPopular, subcategories },
  };
}

const SpareParts = ({ products, category, mostPopular }) => {
  const { parts, skus, modelNum, updateModelNumber } =
    useSparepartsFilter(products);
  const [query, setQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const handleSetSelection = (value) => {
    setSelectedModel(value);
    setQuery(value);
  };
  useEffect(() => {
    updateModelNumber(query);
  }, [query]);

  return (
    <>
      <div className='pt-10 pb-10 contain '>
        <Combobox
          as='div'
          className='relative w-full'
          value={selectedModel}
          onChange={handleSetSelection}
        >
          <Combobox.Input
            className='w-full p-3 px-4 text-lg border rounded'
            placeholder='Enter your model number'
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Options className='absolute z-20 w-full p-3 space-y-2 bg-white rounded shadow-lg top-14'>
            {skus
              .filter((sku) => {
                if (query) {
                  return sku.toLowerCase().includes(query.toLowerCase());
                } else {
                  return true;
                }
              })
              .map((sku) => {
                return (
                  <Combobox.Option
                    key={sku}
                    className='flex items-center justify-between p-2 rounded cursor-pointer hover:bg-black/5'
                    value={sku}
                  >
                    {sku}
                  </Combobox.Option>
                );
              })}
          </Combobox.Options>
        </Combobox>
      </div>
      <div className='bg-brand-gray'>
        {mostPopular.length > 0 && (
          <MostPopular
            products={mostPopular}
            title={`Most popular ${category}`}
          />
        )}

        <ProductsGrid products={parts} title={`All ${category}`} />
      </div>
    </>
  );
};
