import Image from 'next/image';
interface ImgProps {
  data: any;
}

const Img = ({ data }: ImgProps) => {
  const setAR = () => {
    switch (data.settings.aspectRatio) {
      case 'Container':
        return 'h-56 md:h-full w-full';
      case '16x10':
        return 'aspect-w-16 aspect-h-10';
      case '16x9':
        return 'aspect-w-16 aspect-h-9';
      case '16x5':
        return 'aspect-w-16 aspect-h-5';
      case '1x1':
        return 'aspect-w-1 aspect-h-1';
    }
  };
  if (!data?.image?.mediaItemUrl) {
    return <div></div>;
  }
  return (
    <div className={`relative ${setAR()}`}>
      <Image
        src={data.image.mediaItemUrl}
        layout='fill'
        objectFit={data.settings.cover ? 'cover' : 'contain'}
        alt={'bild'}
      />
    </div>
  );
};

export default Img;
