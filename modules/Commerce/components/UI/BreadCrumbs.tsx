import { Fragment } from 'react';
import Link from 'next/link';
import useBreadcrumbs from '@common/hooks/useBreadcrumbs';
import { useRouter } from 'next/router';

export default function BreadCrumbs() {
  const { crumbs } = useBreadcrumbs();

  return (
    <ul
      id='crumbs'
      className='flex items-center space-x-1 text-xs font-medium uppercase md:space-x-2 md:text-base'
    >
      {crumbs?.map((slug, index) => {
        const label =
          slug.charAt(0).toUpperCase() +
          slug.slice(1).replace('-', ' ').split('?')[0];
        const href = `/${crumbs.slice(0, index + 1).join('/')}`;

        return (
          <Fragment key={href + label}>
            <li data-index={index} className='line-clamp-1'>
              <Link href={`${href}`}>{label}</Link>
            </li>
            {index < crumbs.length - 1 && (
              <span className='text-black/30'>/</span>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
}
