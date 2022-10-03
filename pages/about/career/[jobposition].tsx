import { useEffect, useState } from 'react';

import Hero from '@common/sections/Hero';
import Image from 'next/image';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';
import parse from 'html-react-parser';
import sendMail from '@lib/mail/sendMail';
import wp from '@lib/wp/wp';

export const getStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
export const getStaticProps = async (context) => {
  const data = await wp(
    `
    query getJobPosition($slug: ID!) {
        jobposition(id: $slug, idType: SLUG) {
            id
            title
            gqlJobPositions {
                content
                excerpt
              }
            featuredImage {
                node {
                    mediaItemUrl
                }
            }
        }
    }
  `,
    {
      variables: { slug: context.params.jobposition },
    }
  );

  if (!data.jobposition) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      page: data.jobposition,
    },
  };
};
interface JobPositionPageProps {
  page: any;
}
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const JobPositionPage = ({ page }: JobPositionPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    attachments: [],
  });
  const [status, setStatus] = useState({ loading: false, submitted: false });

  const removeAttachment = (index) => {
    let a = [...formData.attachments];
    a.splice(index, 1);
    setFormData((prev) => {
      return {
        ...prev,
        attachments: [...a],
      };
    });
  };
  const handleFileUpload = async (event) => {
    try {
      const files = event.target.files;
      const attachments = [];
      for (let file of files) {
        const file64 = await getBase64(file);

        attachments.push({
          content: file64,
          filename: file.name,
          type: file.type,
          disposition: 'attachment',
        });
      }
      setFormData((prev) => {
        return {
          ...prev,
          attachments: [...prev.attachments, ...attachments],
        };
      });
    } catch (error) {
      //('Could not convert file to base64', error);
    }
  };

  const inputFields = [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Full name',
      value: formData.name,
      onChange: (event) =>
        setFormData((prev) => {
          return { ...prev, name: event.target.value };
        }),
    },
    {
      type: 'email',
      name: 'email',
      placeholder: 'Email',
      value: formData.email,
      onChange: (event) =>
        setFormData((prev) => {
          return { ...prev, email: event.target.value };
        }),
    },
    {
      type: 'phone',
      name: 'phone',
      placeholder: 'Phone',
      value: formData.phone,
      onChange: (event) =>
        setFormData((prev) => {
          return { ...prev, phone: event.target.value };
        }),
    },
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, submitted: false });
    const mail = await sendMail(
      `New application [${page.title}] - ${formData.name}`,
      formData,
      null
    );
    if (mail.statusCode === 202) {
      setStatus({ loading: false, submitted: true });
    } else {
      setStatus({ loading: true, submitted: false });
    }
    //('mail =>', mail);
  };
  return (
    <>
      <NextSeo title={`${page.title} - Open position`} />
      <Hero />
      <Intro heading={page.title} body={page.gqlJobPositions.excerpt} />
      <div className='grid gap-10 md:grid-cols-2 contain'>
        <div className='aspect-w-16 aspect-h-10'>
          {page?.featuredImage?.node?.mediaItemUrl && (
            <Image
              src={page?.featuredImage?.node?.mediaItemUrl}
              layout='fill'
              objectFit='cover'
              alt={page.title}
            />
          )}
        </div>
        <div className='parsed'>
          {page?.gqlJobPositions?.content &&
            parse(page.gqlJobPositions.content)}
        </div>
      </div>
      <div className='p-5 mt-10 rounded md:p-10 contain bg-black/5'>
        <h2>Apply for the position</h2>
        <p className='mt-3'>
          Send in your information and we will reach out to you as soon as
          possible.
        </p>
        {status.submitted ? (
          <div className='mt-5'>
            <strong>Your application has been submitted.</strong>
          </div>
        ) : (
          <form
            onSubmit={(event) => handleSubmit(event)}
            className='mt-10 space-y-5'
          >
            <div className='grid gap-10 md:grid-cols-3'>
              {inputFields.map((input) => (
                <div key={input.name} className='input-group'>
                  <input
                    placeholder={input.placeholder}
                    type={input.type}
                    value={input.value}
                    onChange={input.onChange}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className='block font-bold' htmlFor='attachments'>
                Upload CV, Personal letter
              </label>
              {formData?.attachments?.length > 0 && (
                <ul className='grid gap-5 my-3 md:grid-cols-2'>
                  {formData.attachments.map((attachment, index) => {
                    //('ATT =>', attachment);
                    return (
                      <li
                        className='flex items-center justify-between p-4 bg-white rounded shadow'
                        key={attachment.filename}
                      >
                        <span>{attachment.filename}</span>
                        <div
                          className='cursor-pointer text-brand-red'
                          onClick={() => removeAttachment(index)}
                        >
                          Remove
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
              <input
                type='file'
                className='w-full mt-4'
                name='attachments'
                multiple
                onChange={(event) => handleFileUpload(event)}
              />
            </div>
            <div className='input-group'>
              <textarea
                value={formData.message}
                onChange={(event) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      message: event.target.value,
                    };
                  })
                }
                placeholder='Message'
              />
            </div>
            <div className='flex justify-center '>
              <button className='btn' type='submit'>
                {status.loading ? 'Sending application' : 'Send application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default JobPositionPage;
