const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

import WC from '@lib/commerce/initWoocommerce';
const apiHAndler = async (req, res) => {
  try {
    const id = 14;
    const file = path.join('./data/csv/modelnumbers.csv');
    const stream = fs.createReadStream(file).pipe(csv());
    stream.on('data', (row) => {
      const { sku } = row;
      WC.post(`products/attributes/${id}/terms`, {
        name: sku,
      });
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export default apiHAndler;
