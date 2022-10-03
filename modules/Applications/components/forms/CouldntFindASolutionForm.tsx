import Button from '@common/ui/Buttons/Button';
import { useState } from 'react';

interface CouldntFindASolutionFormProps {
  gas: string;
  system: string;
}

const CouldntFindASolutionForm = ({
  gas,
  system,
}: CouldntFindASolutionFormProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!gas) {
      setError("Please select a gas that you're interested in.");
      return;
    }
    if (!system) {
      setError("Please select a system that you're interested in.");
      return;
    }
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!phone) {
      setError('Please enter your phone number.');
      return;
    }
    if (phone && email && gas && system) {
    }
  };
  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className='p-5 text-left bg-white rounded shadow-lg md:p-10 contain'
    >
      <h3 className='mb-3 text-2xl'>Let us customize a solution for you.</h3>
      <p>
        We couldn't find a recommended solution for your requirements. Contact
        us and we'll customize a solution for you.
      </p>
      <div className='mt-5 space-y-5 rounded'>
        <div className='grid gap-5 md:grid-cols-2'>
          <div className='input-group'>
            <input value={gas} />
          </div>
          <div className='input-group'>
            <input value={system} />
          </div>
        </div>
        <div className='grid gap-5 md:grid-cols-2'>
          <div className='input-group'>
            <input
              className='w-full'
              placeholder='Email'
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className='input-group'>
            <input
              className='w-full'
              placeholder='Phone'
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        </div>
        <div className='input-group'>
          <textarea placeholder='Message' />
        </div>
        <div className='text-center'>
          <p className='font-bold text-red-500'>{error}</p>
        </div>
        <div className='flex items-center justify-center'>
          <Button type='submit'>Send</Button>
        </div>
      </div>
    </form>
  );
};

export default CouldntFindASolutionForm;
