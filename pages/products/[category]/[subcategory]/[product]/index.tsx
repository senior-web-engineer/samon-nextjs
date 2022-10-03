import AddToCartButton from '@modules/Commerce/components/AddToCardButton';
import CompatibleProducts from '@modules/Commerce/components/Product/CompatibleProducts';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import NavBar from '@modules/Commerce/components/UI/NavBar';
import { NextSeo } from 'next-seo';
import ProductHead from '@modules/Commerce/components/Product/ProductHead';
import ProductTabs from '@modules/Commerce/components/Product/ProductTabs';
import Redbox from '@modules/Commerce/components/Product/Redbox';
import RelatedProducts from '@modules/Commerce/components/Product/RelatedProducts';
import getAccessories from '@lib/commerce/products/getAccessories';
import getAllProducts from '@lib/commerce/products/getAllProducts';
import getAllProductsByCategory from '@lib/commerce/products/getAllProductsByCategory';
import getProduct from '@lib/commerce/products/getProduct';
import getProductSlugs from '@lib/commerce/products/getProductSlugs';

export async function getStaticPaths() {
  const paths = await getProductSlugs();
  return {
    paths: paths || [],
    fallback: 'blocking',
  };
}
export async function getStaticProps(context) {
  try {
    const id = context.params.product;
    const product = await getProduct(id);
    const accessories = await getAccessories();

    let compatibleProducts = [];
    if (
      product.categories.find(({ node }) => node.slug === 'monitoring-units')
    ) {
      compatibleProducts = await getAllProductsByCategory(['detectors']);
    }

    if (!product) {
      throw 'No product found';
    }
    return {
      props: {
        product,
        compatibleProducts,
        accessories,
        cta: {
          title: `Do you want to know more about this product?`,
        },
      },
    };
  } catch (error) {
    console.error('ERROR Productpage =>', error);
    return {
      notFound: true,
    };
  }
}

export default function ProductPage({
  product,
  accessories,
  compatibleProducts,
}) {
  return (
    <>
      <NextSeo title={`${product.name} - Products`} />
      <Hero />
      <NavBar />
      <article>
        <ProductHead
          product={product}
          hasCompatibleProducts={compatibleProducts?.length > 0 ? true : false}
        />
        <CompatibleProducts
          product={product}
          compatibleProducts={compatibleProducts}
        />
        <ProductTabs product={product} />
        <Redbox data={product?.productFields?.redbox} />
        <RelatedProducts accessories={accessories} product={product} />
      </article>
    </>
  );
}
