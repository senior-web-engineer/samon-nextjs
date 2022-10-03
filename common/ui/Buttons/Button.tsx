import Link from 'next/link';

interface IButton {
  children: any;
  type?: 'submit' | 'button';
  href?: string | null;
  icon?: boolean;
}
const buttonStyles =
  'md:px-8 md:py-4 px-4 py-2 inline-block text-center rounded-full bg-brand-red !text-white cursor-pointer !no-underline uppercase font-display  hover:ring-4 ring-brand-red/10 transition-all  ';
const withIconStyles =
  'md:px-8 md:py-4 px-4 py-2 text-center rounded-full bg-brand-red text-white cursor-pointer uppercase font-display  hover:ring-4 ring-brand-red/10 transition-all flex  items-center space-x-2 self-center ';
const Button = ({
  href = null,
  children,
  type = 'button',
  icon = false,
}: IButton) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={`${buttonStyles}`}>{children}</a>
      </Link>
    );
  }
  return (
    <button className={`${icon ? withIconStyles : buttonStyles}`} type={type}>
      {children}
    </button>
  );
};
export default Button;
