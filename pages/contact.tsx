import Content from '@modules/Blocks/Content';
import Hero from '@common/sections/Hero';
import Intro from '@common/sections/Intro';
import { LocationContext } from '@modules/Location/LocationContext';
import { NextSeo } from 'next-seo';
import getContacts from '@lib/fetch/getContacts';
import getPage from '@lib/page/getPage';
import { useContext } from 'react';

export const getStaticProps = async (context) => {
  const page = await getPage('contact');
  const contacts = await getContacts();
  return { props: { page, contacts } };
};

interface ContactPageProps {
  page: any;
  contacts: any;
}

const ContactPage = ({ page, contacts }: ContactPageProps) => {
  //('Page =>', page, contacts);
  const { intro, layout } = page.gqlPageFields;
  return (
    <>
      <NextSeo title={`Contact`} />
      <Hero />
      <Intro heading={page.title} body={intro} />
      <Content sections={layout} />
      {/* Map */}
      <RecommendedContacts contacts={contacts} />
      <ContactGroups contacts={contacts} />
    </>
  );
};

export default ContactPage;

const RecommendedContacts = ({ contacts }) => {
  const location = useContext(LocationContext);
  if (!location.country) {
    return null;
  }

  const allGroups: any = contacts
    .map((c) => {
      return c.areaOfExpertise;
    })
    .flat();

  const uniqGroups: any[] = Array.from(new Set(allGroups));
  //('UNIQ', uniqGroups);
  return (
    <>
      <div className='py-20 bg-brand-gray'>
        <div className='contain'>
          <div className='pb-10 text-center'>
            <h2>Recommended contacts in {location.country}</h2>
            <small>
              {location.country}, {location.continent}
            </small>
          </div>
          <ul className='flex flex-wrap justify-center space-y-5 md:space-y-0 md:space-x-5'>
            {uniqGroups.map((g) => {
              const groupContacts = contacts.filter((c) =>
                c.areaOfExpertise.some((e) => e === g)
              );
              const countryContacts = groupContacts.filter((c) =>
                c.responsibleFor.some(
                  (l) => l.toLowerCase() === location.country.toLowerCase()
                )
              );
              const continentContacts = groupContacts.filter((c) =>
                c.responsibleFor.some(
                  (l) => l.toLowerCase() === location.continent.toLowerCase()
                )
              );
              const globalContacts = groupContacts.filter((c) =>
                c.responsibleFor.some((l) => l.toLowerCase() === 'global')
              );

              return (
                <li
                  className='p-4 w-full md:w-auto md:!mb-5 bg-white rounded shadow'
                  key={g}
                >
                  <strong>{g}</strong>
                  <ul className='mt-2'>
                    {countryContacts?.map((c, i) => {
                      if (i < 1) {
                        return (
                          <li className='' key={c.namearea}>
                            <p>{c.namearea}</p>
                            <small className='block'>
                              {c.responsibleFor.map((r) => (
                                <span key={r}>{r}</span>
                              ))}
                            </small>
                            <a
                              className='underline text-brand-red'
                              href={`mailto:${c.email}`}
                            >
                              {c.email}
                            </a>
                          </li>
                        );
                      }
                    })}
                    {countryContacts.length === 0 &&
                      continentContacts.map((c, i) => {
                        if (i < 1) {
                          return (
                            <li key={c.namearea}>
                              <p>{c.namearea}</p>
                              <small className='block'>
                                {c.responsibleFor.map((r) => (
                                  <span key={r}>{r}</span>
                                ))}
                              </small>
                              <a
                                className='underline text-brand-red'
                                href={`mailto:${c.email}`}
                              >
                                {c.email}
                              </a>
                            </li>
                          );
                        }
                      })}
                    {countryContacts.length === 0 &&
                      continentContacts.length === 0 &&
                      globalContacts.map((c, i) => {
                        if (i < 1) {
                          return (
                            <li key={c.namearea}>
                              <p>{c.namearea}</p>
                              <small className='block'>
                                {c.responsibleFor.map((r) => (
                                  <span key={r}>{r}</span>
                                ))}
                              </small>
                              <a
                                className='block underline text-brand-red'
                                href={`mailto:${c.email}`}
                              >
                                {c.email}
                              </a>
                              <small>{c.phone}</small>
                            </li>
                          );
                        }
                      })}
                    {countryContacts.length === 0 &&
                      continentContacts.length === 0 &&
                      globalContacts.length === 0 &&
                      groupContacts.map((c, i) => {
                        if (i < 1) {
                          return (
                            <li key={c.namearea}>
                              <p>{c.namearea}</p>
                              <small className='block'>
                                {c.responsibleFor.map((r) => (
                                  <span key={r}>{r}</span>
                                ))}
                              </small>
                              <a
                                className='block underline text-brand-red'
                                href={`mailto:${c.email}`}
                              >
                                {c.email}
                              </a>
                              <small>{c.phone}</small>
                            </li>
                          );
                        }
                      })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

const ContactGroups = ({ contacts }) => {
  const allGroups: any = contacts.map((c) => c.areaOfExpertise).flat();
  const uniqGroups: any[] = Array.from(new Set(allGroups));

  return (
    <>
      <div className='gap-10 pt-10 md:columns-3 contain'>
        {uniqGroups.map((group) => {
          const groupedContacts = contacts.filter((c) =>
            c.areaOfExpertise.some((e) => e === group)
          );
          return (
            <div
              className='p-5 mb-5 border rounded break-inside-avoid-column first:mb-0'
              key={group}
            >
              <h3>{group}</h3>
              <ul className='mt-4 space-y-3 break-inside-avoid-column'>
                {groupedContacts.map((c) => {
                  return (
                    <li
                      className='rounded break-inside-avoid-column'
                      key={c.namearea}
                    >
                      <p className='font-semibold'>{c.namearea}</p>
                      <small>
                        {c.responsibleFor.map((o, i) =>
                          i + 1 < c.responsibleFor.length ? `${o}, ` : o
                        )}
                      </small>
                      <a
                        className='block underline text-brand-red'
                        href={`mailto:${c.email}`}
                      >
                        {c.email}
                      </a>
                      <small>{c.phone}</small>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
