const WooCommerceApi = require('@woocommerce/woocommerce-rest-api').default;
const WC = new WooCommerceApi({
  url: 'https://samon-cms.h.capacedev.se/',
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: 'wc/v3',
});
export default WC;
