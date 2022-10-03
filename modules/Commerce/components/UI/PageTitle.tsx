export default function PageTitle({ title }) {
  const t = title.charAt(0).toUpperCase() + title.slice(1).replace('-', ' ');
  return (
    <div className='pb-0 contain row-sm'>
      <h1>{t}</h1>
    </div>
  );
}
