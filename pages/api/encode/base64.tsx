const apiHandler = async (req, res) => {
  try {
    const { string } = JSON.parse(req.body);
    const encodedString = Buffer.from(string).toString('base64');
    res.status(200).json({ success: true, data: encodedString });
  } catch (error) {
    console.error('', error);
    res.status(500).json({ success: false });
  }
};

export default apiHandler;
