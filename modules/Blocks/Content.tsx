import Blurb from './Blurb';
import BookAService from './BookAService';
import ButtonsBlock from './Buttons';
import GridLinks from './GridLinks';
import Image from 'next/image';
import Img from './Img';
import JobPositions from './JobPositions';
import PeopleBlock from './People';
import QuoteBlock from './Quote';
import ReferenceList from './ReferenceList';
import TestimonialBlock from './Testimonial';
import TextBlock from './Text';
import TrainingsBlocks from './Trainings';
interface ContentProps {
  sections: any[];
}

const Content = ({ sections }: ContentProps) => {
  return (
    <div id='page-content'>
      {sections
        ?.filter((section) => section)
        .map((section) => (
          <Section
            key={JSON.stringify(section.section)}
            section={section.section}
            settings={section.settings}
          />
        ))}
    </div>
  );
};

export default Content;

const Section = ({ section, settings }) => {
  //(settings.background);
  const background = () => {
    switch (settings.background.type) {
      case 'White':
        return 'bg-white';
      case 'Gray':
        return 'bg-brand-gray';
      case 'Image':
        return 'bg-black';
    }
  };
  if (section) {
    return (
      <div className={`py-10 relative ${background()}`}>
        {settings.background.type === 'Image' &&
          settings?.background?.image?.mediaItemUrl && (
            <Image
              src={settings.background.image.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt='Section background image'
            />
          )}
        {section?.map((row) => (
          <Row key={JSON.stringify(row)} row={row} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

const Row = ({ row }) => {
  return (
    <div className='relative'>
      <div data-columns={row.row.length} className='content-row'>
        {row?.row?.map((column, index) => (
          <Column key={JSON.stringify(column) + index} column={column} />
        ))}
      </div>
    </div>
  );
};

const Column = ({ column }) => {
  return <Blocks blocks={column.column} />;
};

const Blocks = ({ blocks }) => {
  if (blocks) {
    return (
      <div
        data-col-span={blocks && blocks[0]?.columnSpan}
        className='space-y-7 blocks'
      >
        {blocks?.map((blockinit, i) =>
          blockinit.blocks.map((block, index) => {
            return <Block key={block.fieldGroupName + i} block={block} />;
          })
        )}
      </div>
    );
  } else {
    return null;
  }
};
const Block = ({ block }) => {
  switch (block.fieldGroupName) {
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_Image':
      return <Img data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_Text':
      return <TextBlock data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_Quote':
      return <QuoteBlock data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_Blurb':
      return <Blurb data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_People':
      return <PeopleBlock data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_Buttons':
      return <ButtonsBlock data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_Testimonial':
      return <TestimonialBlock data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_JobPositions':
      return <JobPositions data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_Trainings':
      return <TrainingsBlocks data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_BookAService':
      return <BookAService data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_GridLinks':
      return <GridLinks data={block} />;
    case 'Page_Gqlpagefields_layout_section_row_column_Blocks_References':
      return <ReferenceList data={block} />;
    default:
      return <p>{block.fieldGroupName}</p>;
  }
};
