import wp from '@lib/wp/wp';

const getContacts = async () => {
  try {
    const response = await wp(`
    query getContacts {
        page(id: "contact", idType: URI) {
            gqlContacts {
                contacts {
                    areaOfExpertise
                    email
                    namearea
                    phone
                    responsibleFor
                  }
              }
        }
    }
`);
    const data = response.page.gqlContacts.contacts;
    //('DATA getContacts ==>', data);
    return data;
  } catch (error) {
    console.error('ERROR getContacts ==>', error);
    return false;
  }
};

export default getContacts;
