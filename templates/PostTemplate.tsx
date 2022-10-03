import FormContentLock from '@modules/Content/components/ContentLock/FormContentLock';
import Hero from '@common/sections/Hero';
import PostHeading from '@modules/Content/components/Sections/PostHeading';
import Summary from '@modules/Content/components/Sections/Summary';

const PostTemplate = ({ post }) => {
  const { title, contentFields } = post;
  const { settings } = contentFields;
  const isLocked = settings.visibility === 'Open' ? false : true;

  if (isLocked) {
    return (
      <>
        <Hero />
        <Summary post={post} />
        <FormContentLock post={post} />
      </>
    );
  }
  return (
    <>
      <Hero />
      <article className='mx-auto prose-xl max-w-prose'>
        <PostHeading post={post} />
      </article>
    </>
  );
};
export default PostTemplate;
