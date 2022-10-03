import WC from '@lib/commerce/initWoocommerce';

const apiHandler = async (req, res) => {
  try {
    const { id, status } = req.query;
    if (!id || !status) {
      res.status(404).json({
        success: true,
        message: 'Order id or new status was not provided',
      });
      return;
    }
    const response = await WC.put(`orders/${id}`, {
      status: status,
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('ERROR apiHandler ==>', error);
    res.status(500).json({ success: false });
  }
};

export default apiHandler;
