import ReferenceListItem from './ReferenceListItem';

const ReferenceList = ({ items }) => {
  return (
    <ul className='grid gap-5 md:gap-10 contain row-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {items.map((item) => (
        <ReferenceListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
export default ReferenceList;
