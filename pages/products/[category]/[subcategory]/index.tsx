import CategorySection from '@modules/Commerce/components/Products/CategorySection';
import FilterSection from '@modules/Commerce/components/Products/FilterSection';
import Guide from '@modules/Commerce/components/Guide/Guide';
import Hero from '@common/sections/Hero';
import MostPopular from '@modules/Commerce/components/Products/MostPopular';
import NavBar from '@modules/Commerce/components/UI/NavBar';
import { NextSeo } from 'next-seo';
import PageTitle from '@modules/Commerce/components/UI/PageTitle';
import ProductsGrid from '@modules/Commerce/components/Products/ProductsGrid';
import getAttributes from '@lib/commerce/products/getAttributes';
import getCategoryData from '@lib/commerce/products/getCategoryData';
import getChildCategories from '@lib/commerce/getChildCategories';
import getMostPopularProducts from '@lib/commerce/products/getMostPopularProducts';
import getParentCategory from '@lib/commerce/products/getParentCategory';
import getSubCategories from '@lib/commerce/products/getSubCategories';
import slug from 'slug';
import useFilteredProducts from '@modules/Commerce/hooks/useFilteredProducts';
import { useState } from 'react';

export default function ProductCategoryPage({
  categoryData,
  products: unfilteredProducts,
  category,
  attributes,
  mostPopular,
  parent,
}) {
  const { products, updateFilter, filters } =
    useFilteredProducts(unfilteredProducts);

  return (
    <>
      <NextSeo title={`${categoryData.name} ${parent.name} - Products`} />
      <Hero />
      <NavBar />
      <PageTitle title={`${categoryData.name}`} />
      <FilterSection
        filter={filters}
        update={updateFilter}
        attributes={attributes}
      />
      {/* <Guide /> */}
      <div className='bg-brand-gray'>
        <ProductsGrid
          products={products}
          title={
            filters.length === 0
              ? `All ${categoryData.name}`
              : products.length > 0
              ? `Matching ${categoryData.name}`
              : `No matching ${categoryData.name}`
          }
        />
      </div>
    </>
  );
}

export async function getStaticPaths(props) {
  const data = await getChildCategories();
  const paths = data.map((node) => {
    return {
      params: { category: node.parent, subcategory: node.slug },
    };
  });

  return {
    paths: paths || [],
    fallback: 'blocking',
  };
}
export async function getStaticProps(context) {
  const category = context.params.subcategory;
  const categoryData = await getCategoryData(category);
  const products = categoryData?.products ? categoryData.products : [];
  const attributes = getAttributes(products);
  const parent = await getParentCategory(slug(category));
  const mostPopular = await getMostPopularProducts(products);

  return {
    props: {
      categoryData,
      products,
      category,
      mostPopular,
      attributes,
      parent,
    },
  };
}
