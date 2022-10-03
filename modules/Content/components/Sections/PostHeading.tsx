import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { flattenObject } from '@utils/helpers';
import parse from 'html-react-parser';

const PostHeading = ({ post }) => {
  return (
    <>
      <div className='row'>
        <div className='flex items-center space-x-5'>
          <Link href={`/${post?.contentFields?.settings?.type?.slug}`}>
            <a className='text-brand-red'>
              {post?.contentFields?.settings?.type?.name}
            </a>
          </Link>
          <p className='text-sm'>{dayjs(post.date).format('D MMMM, YYYY')}</p>
        </div>
        <h1>{post.title}</h1>
        {post?.featuredImage?.node?.mediaItemUrl && (
          <figure className='relative aspect-w-16 aspect-h-10'>
            <Image
              src={post?.featuredImage?.node?.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt={post?.title}
            />
          </figure>
        )}
        <div>
          {post?.contentFields?.summary && parse(post?.contentFields?.summary)}
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <h3></h3>
        <Link
          href={`/${
            post?.contentFields?.settings.type?.slug
              ? post?.contentFields?.settings.type?.slug
              : 'content'
          }`}
        >
          <a className='btn'>More {post?.contentFields?.settings.type?.name}</a>
        </Link>
      </div>
    </>
  );
};
export default PostHeading;
