import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import Link from 'next/link';
import { getApplications } from '@lib/fetch/getApplications';
import getPage from '@lib/page/getPage';
import { getReferences } from '@lib/fetch/getReferences';
import { getSpecialSolutions } from '@lib/fetch/special-solutions';

const Page = ({ specialSolutions, references, page }) => {
  const acf = page?.gqlPageFields;
  return (
    <>
      <Hero />
      <Intro heading={page.title} body={acf.intro} />
      <Content sections={acf.layout} />
    </>
  );
};
export default Page;

export const getStaticProps = async () => {
  try {
    const specialSolutions = await getSpecialSolutions();
    const references = await getReferences();
    const page = await getPage('service/special-solutions/special-projects');
    return {
      props: {
        specialSolutions,
        references,
        page,
      },
    };
  } catch (error) {
    console.error(error);
    return;
  }
};
