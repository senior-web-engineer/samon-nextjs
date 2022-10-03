import slug from 'slug';
export default function FilterSection({ filter, attributes, update }) {
  return (
    <div className='grid gap-5 rounded sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 contain row-sm'>
      {attributes?.map((attr) => (
        <div className='p-3 rounded bg-brand-gray' key={attr?.label}>
          <h3 className='mb-0 text-base'>{attr?.label?.toUpperCase()}</h3>
          <ul className='flex flex-wrap '>
            {attr?.options.map((option) => {
              const isActive =
                filter && filter.some((item) => item.value === option);

              return (
                <li className='' key={option}>
                  <button
                    onClick={() =>
                      update({ filter: slug(attr.label), value: option })
                    }
                    className={`px-2 py-1 mt-2 mr-2 font-medium text-sm rounded   ${
                      isActive
                        ? 'bg-black/100 text-white hover:bg-black/80'
                        : 'bg-white hover:bg-white/50'
                    }`}
                  >
                    {option.toUpperCase()}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
