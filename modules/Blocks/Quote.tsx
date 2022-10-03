interface QuoteBlockProps {
  data: any;
}

const QuoteBlock = ({ data }: QuoteBlockProps) => {
  //('Quote =>', data);
  return (
    <figure className=''>
      <blockquote className='mb-5 quote'>
        <p className='text-2xl text-brand-red '>{data.quote}</p>
      </blockquote>
      <figcaption>- {data.author}</figcaption>
    </figure>
  );
};

export default QuoteBlock;
