import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import Link from 'next/link';
import getPage from '@lib/page/getPage';
import getTrainings from '@lib/fetch/getTrainings';
import parse from 'html-react-parser';

export const getStaticProps = async (context) => {
  const trainings = await getTrainings();
  const page = await getPage('service/trainings');
  return { props: { page } };
};

interface TrainingsProps {
  page: any;
}

const Trainings = ({ page }: TrainingsProps) => {
  const acf = page?.gqlPageFields;
  return (
    <>
      <Hero />
      <Intro heading={page.title} body={acf.intro} />
      <Content sections={acf.layout} />
    </>
  );
};

export default Trainings;
