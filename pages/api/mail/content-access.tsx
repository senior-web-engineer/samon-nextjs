const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const apiSendMail = async (req, res) => {
  const {
    name,
    email,
    country,
    company,
    existingCustomer,
    interestedInProducts,
    interestedInApplications,
  } = JSON.parse(req.body);
  const { referer } = req.headers;

  try {
    const msg = {
      to: process.env.DEFAULT_EMAIL_TO,
      from: { name: 'Samon', email: process.env.DEFAULT_EMAIL_FROM },
      subject: `${name.first} got access to a document`,
      text: 'Application',
      html: `
      <div>
      <h1>Document access</h1>
      <br/>
      <p><strong>Document:</strong> ${referer}</p>
      <p><strong>Name:</strong> ${name.first} ${name.last}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Country:</strong> ${country}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Existing customer:</strong> ${existingCustomer}</p>
      <p><strong>Interested in products:</strong> ${interestedInProducts}</p>
      <p><strong>Interested in applications:</strong> ${interestedInApplications}</p>
      </div>
      `,
    };
    const response = await sgMail.send(msg);
    //('apiSendMail =>', response);
    console.log('apiSendMail =>', response);
    res.status(200).json(response[0]);
  } catch (error) {
    console.log('Error apiSendMail =>', error.response.body);
    res.status(200).json({ message: 'success' });
  }
};

export default apiSendMail;
