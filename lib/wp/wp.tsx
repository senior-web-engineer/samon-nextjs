interface IVariables {
  batch?: number;
  id?: string;
}
interface IWpFetchOptions {
  variables?: IVariables;
  type?: string;
}
const wp = async (query: string, options?: any) => {
  const hasVariables = options?.variables ? true : false;
  const token = Buffer.from(
    process.env.CMS_GRAPHQL_AUTH_USER + ':' + process.env.CMS_GRAPHQL_AUTH_PASS
  ).toString('base64');
  try {
    const response = await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: options?.variables,
      }),
    });

    const data = await response.json();

    if (!data.data) {
      throw 'ERROR';
    }
    return data.data;
  } catch (error) {
    console.log('ERROR =>', error);
    return false;
  }
};
export default wp;
