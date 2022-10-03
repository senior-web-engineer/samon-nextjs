import { Combobox } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
const modalContainer = {
  visible: {
    opacity: 1,
    y: '0vh',
    zIndex: 9999,
  },
  hidden: {
    opacity: 0,
    y: '100vh',
  },
};

const GasDetectionForm = ({ gases }) => {
  //('GASES =>', gases);
  const router = useRouter();
  const [formMessage, setFormMessage] = useState({
    message: '',
    type: 'error',
  });
  const [inputFocus, setInputFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedGas, setSelectedGas] = useState('');
  const handleSetSelection = (value) => {
    setSelectedGas(value);
    setQuery(value);
    const validGas = isValidGas(value);
    if (validGas) {
      router.push(`/solutions?gas=${value}`);
    }
  };
  const filteredGases =
    query === ''
      ? gases
      : gases.filter((gas) => {
          return gas.title.toLowerCase().includes(query.toLowerCase());
        });

  const isValidGas = (value) => {
    const gas = gases.find(
      (gas) => gas.title.toLowerCase() === value.toLowerCase()
    );
    return gas ? true : false;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const validGas = isValidGas(query);
    if (validGas) {
      router.push(`/solutions?gas=${query}`);
    }
  };
  const handleBlurInput = () => {
    let timeout;
    timeout = setTimeout(() => {
      setInputFocus(false);
      setQuery('');
    }, 100);
    return () => clearTimeout(timeout);
  };
  const handleOnFocus = () => {
    setInputFocus(true);
  };
  return (
    <form className='max-w-[600px] mx-auto' onSubmit={(e) => onSubmit(e)}>
      <div className='grid gap-5 mt-10 rounded-full shadow-lg bg-white/70 backdrop-blur-sm'>
        <div className='relative flex items-center bg-transparent font-display'>
          <Combobox
            as='div'
            className='relative w-full'
            value={selectedGas}
            onChange={handleSetSelection}
          >
            {({ open }) => {
              return (
                <>
                  <div className='grid grid-cols-[1fr,80px] md:grid-cols-[1fr,130px] py-2 px-2'>
                    <Combobox.Input
                      className='w-full px-6 py-3 text-lg'
                      placeholder='Enter a gas'
                      onFocus={() => handleOnFocus()}
                      onBlur={() => handleBlurInput()}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <button type='submit' className='py-1 text-sm btn'>
                      Next
                    </button>
                  </div>
                  {open || inputFocus ? (
                    <Combobox.Options
                      static
                      className='absolute left-0 w-full p-3 space-y-2 bg-white rounded shadow-lg top-20'
                    >
                      {filteredGases
                        .sort((a, b) => a.menuOrder - b.menuOrder)
                        .map((gas) => (
                          <Combobox.Option
                            key={gas.title}
                            className='flex items-center justify-between p-2 rounded cursor-pointer hover:bg-black/5'
                            value={gas.title}
                          >
                            {gas.title}{' '}
                            <span className='px-2 py-[2px] ml-3 text-[10px] uppercase rounded bg-black/10'>
                              {gas.gqlGasFields.category}
                            </span>
                          </Combobox.Option>
                        ))}
                    </Combobox.Options>
                  ) : null}
                </>
              );
            }}
          </Combobox>
        </div>
      </div>
      {formMessage.message && <p>{formMessage.message}</p>}
    </form>
  );
};
export default GasDetectionForm;
