
import wp from '../../wp/wp';
import { SeoFragment } from './get-seo';
export default async function getHomePage() {
    try {
        const response = await wp(
            `query getHomePage {
                page(id: "/", idType: URI) {
                  uri
                  title
                  slug
                  ${SeoFragment}
                }
              }`
        )

        const data = response?.page
        if(!data){
            throw 'Could not fetch data'
        }
        return data
    } catch (error) {
        console.error('ERROR getHomePage ====>', error);
        return false;
    }
}