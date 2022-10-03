import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { NextSeo } from 'next-seo';
import getDocuments from '@modules/Documents/lib/getDocuments';
import { useState } from 'react';

export const getStaticProps = async (context) => {
  const documents = await getDocuments();
  const categories = [];
  documents.forEach((doc) => {
    if (!categories.includes(doc.gqlDocumentFields.category)) {
      categories.push(doc.gqlDocumentFields.category);
    }
  });
  categories.sort((a, b) => (a > b ? 1 : -1));
  return {
    props: {
      documents,
      categories,
    },
  };
};

interface DocumentsPageProps {
  documents: any[];
  categories: string[];
}

const DocumentsPage = ({ documents, categories }: DocumentsPageProps) => {
  //(documents, categories);
  const [filter, setFilter] = useState('');
  const buttonClasses = `bg-brand-darkblue text-sm md:text-base font-bold font-display uppercase text-white rounded-full px-3 py-1`;
  return (
    <>
      <NextSeo title={`Documents`} />
      <Hero />
      <Intro
        heading='Documents'
        body='Below you can download catalogues, handbooks, wiring diagrams and more.'
      />
      <div className='pb-10 section contain'>
        <ul className='flex items-center justify-center space-x-2 md:space-x-3'>
          <li>
            <button
              onClick={() => setFilter('')}
              className={`${buttonClasses} ${
                filter === '' ? 'bg-brand-teal' : null
              }`}
            >
              All
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setFilter(cat)}
                className={`${buttonClasses} ${
                  filter === cat ? 'bg-brand-teal' : null
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='contain section'>
        <h2>{filter === '' ? 'All' : filter} documents</h2>
        <ul className='grid gap-5 mt-5 md:grid-cols-2'>
          {documents
            .filter((doc) =>
              filter === '' ? doc : doc.gqlDocumentFields.category === filter
            )
            .map((doc) => {
              //(doc);
              return (
                <li key={doc.title} className='p-5 border rounded'>
                  <p className='text-base font-semibold md:text-lg text-brand-red'>
                    {doc.gqlDocumentFields.category}
                  </p>
                  <h3 className='mb-2 text-xl md:text-2xl'>{doc.title}</h3>
                  <p className='text-sm line-clamp-2'>
                    {doc.gqlDocumentFields.description}
                  </p>
                  <ul className='mt-3 space-y-2'>
                    {doc.gqlDocumentFields.documents.map(({ document }) => {
                      const split = document.mediaItemUrl.split('/');
                      const filename = split[split.length - 1];
                      return (
                        <li key={document.mediaItemUrl}>
                          <a
                            href={document.mediaItemUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='text-brand-red hover:underline'
                          >
                            {filename}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default DocumentsPage;
