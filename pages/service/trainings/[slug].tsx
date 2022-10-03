import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import getTraining from '@lib/fetch/getTraining';
import parse from 'html-react-parser';

export const getStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
export const getStaticProps = async (context) => {
  const training = await getTraining(context.params.slug);
  return { props: { training } };
};

interface TrainingProps {
  training: any;
}

const Training = ({ training }: TrainingProps) => {
  return (
    <>
      <Hero />
      <Intro
        heading={training.title}
        body={training?.gqlTrainingFields?.shortDescription}
      />
      <div className='grid grid-cols-2 gap-20 contain'>
        <div className='relative aspect-w-16 aspect-h-10'>
          <Image
            src={training.featuredImage.node.mediaItemUrl}
            layout='fill'
            objectFit='cover'
            alt={training.title}
          />
        </div>
        <div>
          <h2 className='mb-3'>Description</h2>
          <div className='prose'>
            {training?.gqlTrainingFields?.description &&
              parse(training.gqlTrainingFields.description)}
          </div>
        </div>
      </div>
      <div className='grid gap-10 px-10 mt-10 py-14 md:grid-cols-2 contain bg-black/5'>
        <div className='flex flex-col justify-center'>
          <h2 className='mb-3'>Apply for training</h2>
          <p>Fill in the form in order to apply for this training.</p>
        </div>
        <div>
          <form onSubmit={(event) => console.log('Hi')}>
            <div className='grid grid-cols-2 gap-5'>
              <div className='input-group'>
                <input type='email' placeholder='Email' />
              </div>
              <div className='input-group'>
                <input type='phone' placeholder='Phone' />
              </div>
            </div>
            <div>
              <button type='submit' className='w-full py-3 mt-5 btn'>
                Apply now
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Training;
