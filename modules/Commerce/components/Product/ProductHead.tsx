import AddToCartButton from '../AddToCardButton';
import Image from 'next/image';
import ProductDetails from './ProductDetails';
import ProductImage from './ProductImage';
export default function ProductHead({ product, hasCompatibleProducts }) {
  return (
    <div className='grid gap-20 contain md:grid-cols-2 row'>
      <ProductImage image={product.image} alt={product.name} />
      <ProductDetails
        product={product}
        hasCompatibleProducts={hasCompatibleProducts}
      />
    </div>
  );
}
