import Image from 'next/image';
export default function ProductImage({ image, alt }) {
  return (
    <figure className='relative aspect-w-16 aspect-h-10 md:aspect-w-1 md:aspect-h-1'>
      {image?.mediaItemUrl && (
        <>
          <Image
            src={image.mediaItemUrl}
            layout='fill'
            objectFit='contain'
            alt={alt}
          />
        </>
      )}
    </figure>
  );
}
