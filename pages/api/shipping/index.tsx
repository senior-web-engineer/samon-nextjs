import WC from '@lib/commerce/initWoocommerce';

const apiShippingHandler = async (req, res) => {
  try {
    const zonesRes = await WC.get('shipping/zones');

    for (const zone of zonesRes.data) {
      //(zone);
      const zoneLocations = await WC.get(`shipping/zones/${zone.id}/locations`);
      const zoneMethods = await WC.get(`shipping/zones/${zone.id}/locations`);
      //(zoneLocations, zoneMethods);
    }

    const data = {};

    res.status(200).json(data);
  } catch (error) {
    console.error('ERROR apiShippingHandler ==>', error);
    res.status(500).json({ message: 'Error' });
  }
};

export default apiShippingHandler;
