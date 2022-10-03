import Link from 'next/link';

interface ButtonsBlockProps {
  data: any;
}

const ButtonsBlock = ({ data }: ButtonsBlockProps) => {
  const { buttons, settings } = data;
  const orientation = () => {
    switch (settings.orientation) {
      case 'Left':
        return 'justify-start';
      case 'Center':
        return 'justify-center';
      case 'Right':
        return 'justify-end';
    }
  };
  return (
    <div className={`flex relative items-center ${orientation()}`}>
      {buttons.map((btn) => (
        <Link key={btn.url + btn.label} href={btn.url}>
          <a className='btn'>{btn.label}</a>
        </Link>
      ))}
    </div>
  );
};

export default ButtonsBlock;
