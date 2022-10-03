export const DISTRIBUTORS_ALL = `
    query fetchAllDistributors {
        allDistributor(first: 1000) {
            edges {
                node {
                    title
                    id
                    slug
                    featuredImage {
                        node {
                            mediaItemUrl
                        }
                    }
                    distributorFields {
                        information {
                            address {
                                latitude
                                longitude
                                city
                                country
                                streetAddress
                            }
                            phone
                            email
                            website
                            productUrl
                        }
                    }
                }
            }
        }
    }
`;

export const DISTRIBUTOR_SINGLE = `
  query fetchSingleDistributorByID($id: ID!) {
      distributor(id: $id, idType: SLUG) {
        title
        featuredImage {
            node {
                mediaItemUrl
            }
        }
        distributorFields {
            information {
                website
                phone
                email
                
                
                
                
                address {
                    streetAddress
                    country
                }
            }
        }
      }
  }
`;
