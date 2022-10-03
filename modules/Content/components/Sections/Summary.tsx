import Image from 'next/image';
import Link from 'next/link';
import { flattenObject } from '@utils/helpers';
import parse from 'html-react-parser';
const Summary = ({ post }) => {
  post = flattenObject(post);

  return (
    <>
      <div
        className={`contain row grid gap-10 ${
          post['featuredImage.node.mediaItemUrl']
            ? 'md:grid-cols-[2fr,3fr]'
            : 'md:grid-cols-[1fr]'
        }`}
      >
        <div className='relative'>
          {post['featuredImage.node.mediaItemUrl'] && (
            <Image
              src={post['featuredImage.node.mediaItemUrl']}
              layout='fill'
              objectFit='contain'
              alt={post.title}
            />
          )}
        </div>
        {post['contentFields.summary'] && (
          <div>
            <Link href={`/${post['contentFields.settings.type.slug']}`}>
              <a className='no-underline text-brand-red'>
                {post['contentFields.settings.type.name']}
              </a>
            </Link>
            <div className='prose'>
              <h1 className=''>{post.title}</h1>
              {post['contentFields.summary'] &&
                parse(post['contentFields.summary'])}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Summary;
